//================================ React Native Imported Files ======================================//

import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
// import messaging from "@react-native-firebase/messaging";
import storage from "@react-native-firebase/storage";
import { statusCodes } from "@react-native-google-signin/google-signin";
import moment from "moment";
import { Platform } from "react-native";
import {
  COLLECTION_USERS,
  CURRENT_USER_UID,
  MESSAGES,
  MESSAGING_SERVER_KEY,
  THREADS,
} from "./FirebaseConstants";

class FirebaseServices {
  constructor(props) {}

  /**
   * Method to get geopoint object from firestore.
   * @param {number} latitude - The latitude value.
   * @param {number} longitude - The longitude value.
   * @return {object} Firestore geopoint object.
   */
  getGeoPoint = (latitude, longitude) =>
    new firestore.GeoPoint(latitude, longitude);

  /**
   * Method to get the current authenticated user.
   * @return {object} Current authenticated user object.
   */
  getCurrentUser = () => auth().currentUser;

  /**
   * Method to get authentication instance from firebase.
   * @return {object} Authentication instance.
   */
  getAuth = () => auth();

  socialLogin = async (providerName, idToken) => {
    let provider;

    switch (providerName) {
      case "google":
        provider = new auth.GoogleAuthProvider();
        break;
      case "facebook":
        provider = new auth.FacebookAuthProvider();
        break;
      case "twitter":
        provider = new auth.TwitterAuthProvider();
        break;
      default:
        throw new Error("Unsupported provider");
    }

    // The rest of the function only applies to Google, Facebook, and Twitter
    if (providerName !== "apple") {
      try {
        // Sign in with the provider
        const result = await auth().signInWithPopup(provider);
        // The signed-in user info.
        var user = result.user;

        // Additional provider-specific information, like access tokens, can be found in result.additionalUserInfo

        // Return a success object with the user information
        return {
          isSuccess: true,
          user: user,
          message: `${
            providerName.charAt(0).toUpperCase() + providerName.slice(1)
          } login successful.`,
        };
      } catch (error) {
        console.error(error);
        // Return a failure object with the error message
        return {
          isSuccess: false,
          user: null,
          message: error.message,
        };
      }
    }
  };

  /**
   * Async method to signup new user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   */
  signUpWith = async (email, password) => {
    try {
      const authResponse = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      await AsyncStorage.setItem(CURRENT_USER_UID, authResponse.user.uid);
      await this.getProfileForUser(authResponse.user.uid);
      return {
        isSuccess: true,
        response: authResponse,
        message: "User signed up successfully.",
      };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, response: null, message: error.message };
    }
  };

  /**
   * Async method to login with email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   */
  loginWithEmailPass = async (email, password) => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      const userProfile = await this.getProfileForUser(user.user.uid);
      await AsyncStorage.setItem(CURRENT_USER_UID, user.user.uid);
      return {
        isSuccess: true,
        response: userProfile,
        message: "User logged in successfully.",
      };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, response: null, message: error.message };
    }
  };

  /**
   * Async method to reset user password.
   * @param {string} email - The email of the user.
   */
  forgotPassword = async (email) => {
    try {
      await auth().sendPasswordResetEmail(email);
      return {
        isSuccess: true,
        response: null,
        message: "Password reset email sent.",
      };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, response: null, message: error.message };
    }
  };

  /**
   * Method to return error message.
   * @param {object} error - The error object.
   * @return {string} Error message.
   */
  returnErrorMessage = (error) => {
    let errorMessage =
      "There is an unknown error with status code " + error.code;
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      errorMessage = "The user canceled the sign-in flow";
    } else if (error.code === statusCodes.IN_PROGRESS) {
      errorMessage = "The sign-in flow is still in progress";
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      errorMessage = "Play services are not available";
    }
    return errorMessage;
  };

  /**
   * Async method to complete login process for user.
   * @param {object} user - The user object.
   */
  completeLoginProcessForUser = async (user) => {
    try {
      const profileCallBack = await this.getProfileForUser(user.user.uid);
      if (profileCallBack.isSuccess) {
        await AsyncStorage.setItem(CURRENT_USER_UID, user.user.uid);
        return {
          isSuccess: true,
          response: profileCallBack.response,
          message: "User logged in successfully.",
        };
      } else {
        return {
          isSuccess: false,
          response: user,
          message: "Invalid user credentials",
        };
      }
    } catch (error) {
      console.error(error);
      return { isSuccess: false, response: null, message: error.message };
    }
  };
  // ---------------------------- Get Fcm Token ---------------------------- //
  /**
   * Async method to request permission for push notifications.
   */
  requestPermissionForPushNotifications = async () => {
    try {
      const response = await messaging().requestPermission();
      console.log("Notification - requestPermission ===>> ", response);
      return { isSuccess: true, response: null, messaging: response };
    } catch (error) {
      console.log("Notification - requestPermission (Error) ===>> ", error);
      return { isSuccess: false, response: null, message: error.message };
    }
  };

  /**
   * Async method to get Firebase Cloud Messaging token.
   */
  getFcmToken = async () => {
    try {
      const resp = await messaging().getToken();

      return resp;
    } catch (error) {
      console.log("error", error);
      return null;
    }
  };

  // ---------------------------- User Records ---------------------------- //

  /**
   * Async method to set profile for a user.
   */
  setProfileForUser = async (userId, isNew, profileData) => {
    let firebaseRef = firestore().collection(COLLECTION_USERS).doc(userId);

    try {
      if (isNew) {
        await firebaseRef.set(profileData);
      } else {
        await firebaseRef.update(profileData);
      }
      const response = await this.getProfileForUser(userId);
      return {
        isSuccess: true,
        response: response,
        message: "Profile updated successfully",
      };
    } catch (error) {
      console.log("setProfileForUser (Error) ==> ", error);
      alert(error.message);
      return { isSuccess: false, response: null, message: error };
    }
  };

  /**
   * Async method to fetch user data.
   */
  fetchUserData = async (userId) => {
    const res = await firestore()
      .collection(COLLECTION_USERS)
      .doc(userId)
      .get();
    return res.data();
  };
  fetchThreadData = async (threadId) => {
    try {
      const threads = await firestore().collection(THREADS).doc(threadId).get();
      if (threads.exists) {
        const userDoc = threads.docs[0];
        const userData = userDoc.data();

        return {
          isSuccess: true,
          response: userData,
          message: "user found",
        };
      } else {
        return {
          isSuccess: true,
          response: null,
          message: "user not found",
        };
      }
    } catch (error) {
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };

  findThreadData = async (emails) => {
    try {
      emails.sort((a, b) => a - b);
      let threads = firestore().collection(THREADS);
      emails.map((email) => {
        threads = threads.where(
          `participantEmails.${email.replace(/[^a-zA-Z0-9 ]/g, "")}`,
          "==",
          true
        );
      });
      threads = await threads.get();

      const userDoc = threads?.docs?.map((item) => ({
        ...item.data(),
        id: item.id,
      }));

      if (userDoc.length > 0) {
        return {
          isSuccess: true,
          response: userDoc,
          message: "user found",
        };
      } else {
        return {
          isSuccess: true,
          response: null,
          message: "user not found",
        };
      }
    } catch (error) {
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };

  createThread = async (users, last_message, currentUser) => {
    try {
      let response = await firestore()
        .collection(THREADS)
        .add({
          participantEmails: users.reduce((a, b) => {
            a[b.email.replace(/[^a-zA-Z0-9 ]/g, "")] = true;
            return a;
          }, {}), // ["aemail1@gmail.com", "bemail2@gmail.com"]
          participants: users, // [{email: "", name: "", profileImage: ""}]
          last_message: last_message,
          last_message_unix: firestore.FieldValue.serverTimestamp(),
          unread_messages: 1,
          unread_message_by: currentUser.email,
        });
      response = await response.get();

      return {
        isSuccess: true,
        response: response.id,
        message: "thread created",
      };
    } catch (error) {
      console.log("error", error);
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };
  updateThread = async (threadId, data) => {
    try {
      await firestore().collection(THREADS).doc(threadId).update(data);
      const threadData = await firestore()
        .collection(THREADS)
        .doc(threadId)
        .get();
      return {
        isSuccess: true,
        response: threadData.data(),
        message: "thread updated",
      };
    } catch (error) {
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };
  sendMessage = async (threadId, message, senderEmail, receiverEmail) => {
    try {
      await firestore().collection(MESSAGES).add({
        threadId: threadId,
        message: message,
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
        created_date: firestore.FieldValue.serverTimestamp(),
        created_date_unix: firestore.FieldValue.serverTimestamp(),
      });
      return {
        isSuccess: true,
        response: null,
        message: "message sent",
      };
    } catch (error) {
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };
  markMessagesAsRead = (threadId) => {
    const data = {
      unread_messages: 0,
    };
    this.updateThread(threadId, data);
  };
  getMessages = (threadId, callback) => {
    const query = firestore()
      .collection(MESSAGES)
      .where("threadId", "==", threadId)
      .orderBy("created_date_unix", "desc");
    const unsubscribe = query.onSnapshot(
      (snapshot) => {
        const messages = snapshot.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        const data = {
          unread_messages: 0,
        };
        this.updateThread(threadId, data);
        console.log("====================================");
        console.log(messages.length);
        console.log("====================================");
        callback({
          isSuccess: true,
          response: messages,
          message: "messages found",
        });
      },
      (error) => {
        console.log(error);
        callback({
          isSuccess: false,
          response: null,
          message: error.message,
        });
      }
    );

    // Return the unsubscribe function to allow stopping listening to changes.
    return unsubscribe;
  };

  sendNotifications = async ({
    title,
    body,
    fcm_tokens,
    notificationType = "default",
    senderEmail = "default",
    senderUserName = "default",
    senderProfileImage = "default",
  }) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `key=${MESSAGING_SERVER_KEY}`);
    myHeaders.append("Content-Type", "application/json");
    var data = {
      registration_ids: fcm_tokens,
      notification: {
        body: body,
        title: title,
        sound: "default",
      },
      android: {
        sound: "default",
        notification: null,
      },
      data: {
        body: body,
        title: title,
        notificationType: notificationType,
        senderEmail: senderEmail,
        senderUserName: senderUserName,
        senderProfileImage: senderProfileImage,
      },
    };
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        "https://fcm.googleapis.com/fcm/send",
        requestOptions
      );
      const result = await response.json();
      return { isSuccess: true, res: result };
    } catch (error) {
      return { isSuccess: false, res: error };
    }
  };
  /**
   * Async method to get profile for a user.
   */
  getProfileForUser = async (userId) => {
    const doc = await this.fetchDocument(COLLECTION_USERS, userId, [], false);
    if (doc.isSuccess) {
      CommonDataManager.getInstance().setUser(doc.response);
      return doc;
    } else {
      return {
        isSuccess: false,
        response: null,
        message: "Profile Not found",
      };
    }
  };

  /**
   * Async method to upload an image.
   */
  uploadImage = async (imageUri, imageName, imageURL = "") => {
    if (imageURL) {
      console.log(imageURL); // Deleting Old Image Using This Image URL
    }
    const image =
      Platform.OS === "android" ? imageUri : imageUri.replace("file:///", ""); //imagePath.uri;
    const imageRef = storage().ref(`ProfileImages/${imageName}.png`);

    try {
      await imageRef.putFile(image);
      const url = await imageRef.getDownloadURL();
      return {
        isSuccess: true,
        response: url,
        message: "Image uploaded successfully",
      };
    } catch (error) {
      alert(error.message);
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };
  uploadImages = async (imageUris, imageName) => {
    const imageUrls = [];
    let success = true;
    let errorMessage = "";

    for (const [index, imageUri] of imageUris.entries()) {
      const image =
        Platform.OS === "android" ? imageUri : imageUri.replace("file:///", "");
      const imageRef = storage().ref(
        `ProfileImages/${imageName + "-" + index}.png`
      );
      try {
        await imageRef.putFile(image);
        const url = await imageRef.getDownloadURL();
        imageUrls.push(url);
      } catch (error) {
        console.error("Error uploading image:", error.message);
        success = false;
        errorMessage = error.message;
        break; // Exiting the loop if an error occurs
      }
    }

    return {
      isSuccess: success,
      message: success ? "Images uploaded successfully" : errorMessage,
      imageUrls: imageUrls,
    };
  };
  uploadAudio = async (audioUri, audioName, audioURL = "") => {
    if (audioURL) {
      console.log(audioURL); // Deleting Old Audio Using This Audio URL
    }

    // Adjust for platform-specific file pathing
    const audio =
      Platform.OS === "android" ? audioUri : audioUri.replace("file:///", "");

    const audioRef = storage().ref(`ProfileAudios/${audioName}.mp3`); // Assuming mp3 format, change as required

    try {
      await audioRef.putFile(audio);
      const url = await audioRef.getDownloadURL();
      return {
        isSuccess: true,
        response: url,
        message: "Audio uploaded successfully",
      };
    } catch (error) {
      alert(error.message);
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };
  deleteAudio = async (audioURL) => {
    try {
      const audioRef = storage().refFromURL(audioURL);
      await audioRef.delete();
    } catch (error) {
      console.error("Error deleting audio:", error);
      throw new Error("Failed to delete audio."); // re-throwing the error allows the calling function to handle it further if required
    }
  };

  // ---------------------------- Collection CURD ---------------------------- //
  fetchDocument = async (
    collectionName,
    documentId,
    arrayFilters,
    subscribeForSnapshot
  ) => {
    let firestoreCollection = firestore().collection(collectionName);
    if (documentId) {
      firestoreCollection = firestoreCollection.doc(documentId);
    } else {
      arrayFilters.forEach((filter) => {
        const { key, operator, value } = filter;
        firestoreCollection = firestoreCollection.where(key, operator, value);
      });
    }

    if (subscribeForSnapshot) {
      return await this._liveSnapshot(firestoreCollection);
    } else {
      return await this._fetchDocument(firestoreCollection);
    }
  };
  getUserDataByEmail = async (email) => {
    try {
      const usersRef = firestore().collection("users");

      // Use a where query to search for users with a matching email
      const querySnapshot = await usersRef.where("email", "==", email).get();

      // Check if we've found any users
      if (querySnapshot.empty) {
        return {
          isSuccess: true,
          response: null,
          message: "user not found",
        };
      }

      // If multiple users are found, this will just take the first one (assuming unique emails)
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      return {
        isSuccess: true,
        response: userData,
        message: "user found",
      };
    } catch (error) {
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };
  chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  fetchDocumentsByIds = async (collectionName, ids) => {
    const db = firestore();

    if (!ids || ids.length === 0) {
      return {
        isSuccess: true,
        response: [],
        message: "No IDs provided.",
      };
    }

    try {
      const documentChunks = this.chunkArray(ids, 10); // Split the ids into chunks of 10
      const allDocuments = [];

      for (let chunk of documentChunks) {
        const querySnapshot = await db
          .collection(collectionName)
          .where(firestore.FieldPath.documentId(), "in", chunk)
          .get();

        querySnapshot.forEach((doc) => {
          allDocuments.push({
            id: doc.id,
            data: doc.data(),
          });
        });
      }

      return {
        isSuccess: true,
        response: allDocuments,
        message: "Documents fetched successfully",
      };
    } catch (error) {
      console.log("fetchDocumentsByIds (ERROR) ===>>", error);
      return {
        isSuccess: false,
        response: null,
        message: error.message || "Error fetching documents",
      };
    }
  };

  fetchPaginatedDocument = async (
    collectionName,
    arrayFilters,
    limit,
    startAfter
  ) => {
    let firestoreCollection = firestore().collection(collectionName);

    arrayFilters.forEach((filter) => {
      const { key, operator, value } = filter;
      firestoreCollection = firestoreCollection.where(key, operator, value);
    });

    firestoreCollection = firestoreCollection
      .orderBy("created_date_unix", "desc")
      .limit(limit);

    if (startAfter != null) {
      firestoreCollection = firestoreCollection.startAfter(startAfter);
    }

    return await this._fetchDocument(firestoreCollection);
  };

  fetchUsersExcludingEmails = async (
    excludedEmails = [],
    gender = null,
    status = "completed",
    country = null,
    sect = null,
    ethnicity = null,
    age = null
  ) => {
    const db = firestore();

    if (excludedEmails.length > 10) {
      throw new Error("You can exclude up to 10 emails only.");
    }

    try {
      let query = db.collection("users");

      // Filter by provided gender if it's given
      if (gender) {
        query = query.where("gender", "==", gender);
      }

      // Ensure the profile status is "completed"
      query = query.where("profile_status", "==", status);

      // Exclude specific emails if any are provided
      if (excludedEmails.length > 0) {
        query = query.where("email", "not-in", excludedEmails);
      }
      if (country) {
        query = query.where("country.name", "==", country);
      }
      if (sect) {
        query = query.where("sect.title", "==", sect);
      }
      if (ethnicity) {
        query = query.where("ethnic.name", "==", ethnicity);
      }
      if (age) {
        // const startTimestamp = firestore.Timestamp.fromMillis(age.start);
        // const endTimestamp = firestore.Timestamp.fromMillis(age.end);
        query = query
          .where("dateOfBirth", ">=", age.start)
          .where("dateOfBirth", "<=", age.end);
      }

      const snapshot = await query.get();

      const users = [];
      snapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return {
        isSuccess: true,
        response: users,
        message: "Users fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      return {
        isSuccess: false,
        response: null,
        message: error.message || "Error fetching users",
      };
    }
  };

  addOrUpdateDocument = async (
    collectionName,
    documentId,
    documentData,
    customId = null
  ) => {
    let fireStoreCollection = firestore().collection(collectionName);
    if (documentId?.length > 0) {
      fireStoreCollection = fireStoreCollection
        .doc(documentId)
        .update(documentData);
    } else {
      if (customId) {
        fireStoreCollection = fireStoreCollection
          .doc(customId)
          .set(documentData);
      } else {
        fireStoreCollection = fireStoreCollection.add(documentData);
      }
    }

    try {
      const response = await fireStoreCollection;
      return {
        isSuccess: true,
        response: response,
        message: "Document updated/added successfully",
      };
    } catch (error) {
      console.log("addOrUpdateDocument (ERROR) ===>>", error);
      return { isSuccess: false, response: null, message: error };
    }
  };
  addOrUpdateDocumentByUserID = async (
    collectionName,
    userId,
    documentData
  ) => {
    let fireStoreCollection = firestore().collection(collectionName);

    try {
      // Query for the document with the given userId
      const querySnapshot = await fireStoreCollection
        .where("uid", "==", userId)
        .get();

      // If the document exists, update it
      if (!querySnapshot.empty) {
        const documentSnapshot = querySnapshot.docs[0];
        await documentSnapshot.ref.update(documentData);
        return {
          isSuccess: true,
          response: documentSnapshot.id,
          message: "Document updated successfully",
        };
      } else {
        // If the document doesn't exist, create a new one
        const newDocumentRef = await fireStoreCollection.add({
          ...documentData,
          userId: userId, // assuming you want to store the userId in the document as well
        });
        return {
          isSuccess: true,
          response: newDocumentRef.id,
          message: "Document added successfully",
        };
      }
    } catch (error) {
      console.log("addOrUpdateDocumentByUserID (ERROR) ===>>", error);
      return { isSuccess: false, response: null, message: error };
    }
  };

  saveArrayToFirestore = async (dataArray, collectionName) => {
    for (const item of dataArray) {
      const result = await this.addOrUpdateDocument(collectionName, null, item);

      if (!result.isSuccess) {
        console.error(`Failed to save item: ${result.message}`);
        // Decide whether you want to break out of the loop or continue with the next item
      } else {
        console.log(`Saved item successfully`);
      }
    }
  };
  deleteUser = async (collection, documentId) => {
    try {
      const db = firestore();
      await db.collection(collection).doc(documentId).delete();
      return {
        isSuccess: true,
        response: null,
        message: "Document successfully deleted!",
      };
    } catch (error) {
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };
  deleteDocument = async (collection, documentId) => {
    try {
      const db = firestore();
      await db.collection(collection).doc(documentId).delete();
      return {
        isSuccess: true,
        response: null,
        message: "Document successfully deleted!",
      };
    } catch (error) {
      console.error("Error deleting document:", error);
      return {
        isSuccess: false,
        response: null,
        message: error.message,
      };
    }
  };

  _fetchDocument = async (firestoreCollection) => {
    const snapshot = await firestoreCollection.get();

    if (!snapshot?._data) {
      const lastVisible = snapshot?._docs[snapshot?._docs?.length - 1];
      const snapshotData = snapshot?._docs.map((item) => {
        let data = item._data;
        data.docId = item._ref.id;
        return data;
      });

      if (snapshot?._docs && snapshot?._docs.length > 0) {
        return {
          isSuccess: true,
          response: snapshotData,
          lastVisible,
          message: "Document fetched successfully",
        };
      } else {
        return {
          isSuccess: false,
          response: null,
          message: "Document Not found",
        };
      }
    } else {
      if (snapshot?._data) {
        let documentData = snapshot?._data;
        documentData.docId = snapshot?._ref.id;
        return {
          isSuccess: true,
          response: documentData,
          message: "Document fetched successfully",
        };
      } else {
        return {
          isSuccess: false,
          response: null,
          message: "Document Not found",
        };
      }
    }
  };

  _liveSnapshot = async (firestoreCollection) => {
    let snapshot_ref = firestoreCollection.onSnapshot((snapshot) => {
      const snapshotData = snapshot?._docs.map((item) => {
        let data = item._data;
        data.docId = item._ref.id;
        return data;
      });
      if (snapshot?._docs && snapshot?._docs.length > 0) {
        return {
          isSuccess: true,
          response: snapshotData,
          reference: snapshot_ref,
          message: "Data fetched successfully",
        };
      } else {
        return {
          isSuccess: false,
          response: null,
          reference: snapshot_ref,
          message: "Data Not found",
        };
      }
    });
    return snapshot_ref;
  };
}

const ApiServices = new FirebaseServices();

export default ApiServices;
