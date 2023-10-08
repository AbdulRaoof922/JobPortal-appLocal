import ApiService from './ApiService';
import BaseUrl from './BaseUrl';
import EndPoints from './EndPoints';
import {RESPONSE} from './HttpResponse';

class apiClient {
  login = async (email, password) => {
    const url = BaseUrl + EndPoints.LOGIN;
    const body = {
      email: email,
      password: password,
    };
    return await ApiService.sendPostRequest(url, body, '', '', true);
  };
  logout = async token => {
    const url = BaseUrl + EndPoints.LOGOUT;
    let form = new FormData();
    return await ApiService.sendPostRequest(url, form, token);
  };

  otpVerification = async (code, email) => {
    try {
      const response = await fetch(BaseUrl + EndPoints.OPT_VERIFY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({otp: code, email: email}),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          return data;
        });
      if (response.code === 200 || response.code === 201) {
        return RESPONSE(true, response.message, response.data);
      } else {
        return RESPONSE(false, response.message, []);
      }
    } catch (errorResponse) {
      if (errorResponse?.status === 408) {
        Alert.alert('Request Timeout');
      } else {
        console.log('errorResponse', errorResponse);
        // Alert.alert("Network Request Failed");
      }

      return RESPONSE(false, errorResponse.message, []);
    }
  };
  setProfile = async data => {
    const url = BaseUrl + EndPoints.Set_PROFILE;
    let formData = new FormData();
    data.name && formData.append('name', data.name);
    data.gender && formData.append('gender', data.gender);
    data.role && formData.append('role', data.role);
    if (data.image) {
      if (data.image.hasOwnProperty('path')) {
        formData.append('profile_url', {
          uri: data.image.path,
          type: data.image.mime,
          name: 'profile image',
        });
      } else {
        formData.append('profile_url', data.image);
      }
    }
    data.fcm_token && formData.append('fcm_token', data.fcm_token);
    data.notification !== null &&
      formData.append('notification', data.notification);

    return await ApiService.sendPostRequest(url, formData, data.token);
  };
  resendOtp = async email => {
    const url = BaseUrl + EndPoints.RESEND_OTP;

    let formData = new FormData();
    formData.append('email', email);

    return await ApiService.sendPostRequest(url, formData);
  };

  forgotPassword = async email => {
    const url = BaseUrl + EndPoints.FORGET_PASSWORD;

    let formData = new FormData();
    formData.append('email', email);

    return await ApiService.sendPostRequest(url, formData);
  };
  chnagePassword = async data => {
    const url = BaseUrl + EndPoints.CHANGE_PASSWORD;

    let formData = new FormData();
    formData.append('current_password', data.current_password);
    formData.append('new_password', data.new_password);
    formData.append('confirm_password', data.confirm_password);

    return await ApiService.sendPostRequest(url, formData, data.token);
  };

  addShop = async (
    shopName,
    address,
    logo,
    latitude,
    longitude,
    category_id,
    token,
    is_variant,
  ) => {
    const url = BaseUrl + EndPoints.ADD_SHOP;
    let formData = new FormData();

    formData.append('name', shopName);
    formData.append('address', address);
    formData.append('logo', {
      uri: logo.path,
      type: logo.mime,
      name: 'shopLogo',
    });
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('category_id', category_id);
    formData.append('is_variant', is_variant);

    return await ApiService.sendPostRequest(url, formData, token);
    console.log(formData);
  };
  updateShop = async (
    shopName,
    address,
    logo,
    latitude,
    longitude,
    category_id,
    id,
    token,
    is_variant,
  ) => {
    const url = BaseUrl + EndPoints.UPDATE_SHOP;
    let formData = new FormData();
    shopName && formData.append('name', shopName);
    address && formData.append('address', address);
    logo &&
      formData.append('logo', {
        uri: logo.path,
        type: logo.mime,
        name: 'shopLogo',
      });
    latitude && formData.append('latitude', latitude);
    longitude && formData.append('longitude', longitude);
    category_id && formData.append('category_id', category_id);

    formData.append('id', id);
    formData.append('is_variant', is_variant);
    return await ApiService.sendPostRequest(url, formData, token);
  };

  getMyProducts = async (token, queryParams) => {
    const url = BaseUrl + EndPoints.MY_PRODUCTS;
    return await ApiService.sendGetRequest(url, token, queryParams);
  };
  getShopDetails = async (token, queryParams) => {
    const url = BaseUrl + EndPoints.SHOP_DETAILS;
    return await ApiService.sendGetRequest(url, token, queryParams);
  };
  getAllShops = async (token, paramQuery, categoryId) => {
    const url = BaseUrl + EndPoints.GET_ALL_SHOPS;
    const formData = new FormData();
    categoryId && formData.append('category_id', categoryId);
    console.log('categoryId', categoryId);
    return await ApiService.sendPostRequest(url, formData, token, paramQuery);
  };

  getProductDetails = async (token, queryParams) => {
    const url = BaseUrl + EndPoints.PRODUCT_DETAILS;

    return await ApiService.sendGetRequest(url, token, queryParams);
  };

  getShopWithProducts = async (token, paramQuery) => {
    const url = BaseUrl + EndPoints.GET_SHOP_WITH_PRODUCTS;
    const formData = new FormData();
    return await ApiService.sendGetRequest(url, token, paramQuery);
  };
  getShopStats = async (token, queryParams) => {
    const url = BaseUrl + EndPoints.GET_ORDERS_STATUS_COUNT;
    return await ApiService.sendGetRequest(url, token, queryParams);
  };
  addDocument = async data => {
    const url = BaseUrl + EndPoints.UPLOAD_DOCUMENT;
    console.log(url);
    let formData = new FormData();
    formData.append('type', data.type);
    formData.append('name', data.name);
    formData.append('front_image', {
      uri: data.front_image.path,
      type: data.front_image.mime,
      name: 'Document',
    });
    // conditional data are optional
    data.backImage &&
      formData.append('back_image', {
        uri: data.front_image.path,
        type: data.front_image.mime,
        name: 'Document',
      });
    formData.append('expiry_date', data.issue_date);
    data.issue_date && formData.append('issue_date', data.issue_date);
    return await ApiService.sendPostRequest(url, formData, data.token);
  };

  updateDocument = async (data, token) => {
    const url = BaseUrl + EndPoints.UPDATE_DOCUMENT;
    console.log(data.front_image);
    let formData = new FormData();
    data.type && formData.append('type', data.type);
    data.name && formData.append('name', data.name);
    data.front_image &&
      formData.append('front_image', {
        uri: data.front_image.path,
        type: data.front_image.mime,
        name: 'Document',
      });
    // conditional data are optional
    data.backImage &&
      formData.append('back_image', {
        uri: data.front_image.path,
        type: data.front_image.mime,
        name: 'Document',
      });
    data.expiry_date && formData.append('expiry_date', data.expiry_date);
    data.issue_date && formData.append('issue_date', data.issue_date);
    formData.append('id', data.id);
    return await ApiService.sendPostRequest(url, formData, token);
  };

  getAllDocuments = async token => {
    const url = BaseUrl + EndPoints.GET_ALL_DOCUMENTS;
    return await ApiService.sendGetRequest(url, token);
  };

  addBankInformation = async (data, token) => {
    const url = BaseUrl + EndPoints.ADD_BANK;
    let formData = new FormData();
    formData.append('bank_name', data.bankName);
    formData.append('clearance_code', data.bankClearingCode);
    formData.append('code', data.bankCode);
    formData.append('account', data.accountNumber);
    formData.append('iban', data.ibanNumber);
    formData.append('address', data.bankAddress);

    return await ApiService.sendPostRequest(url, formData, token);
  };

  deleteBank = async (token, id) => {
    const url = BaseUrl + EndPoints.DELETE_BANK;
    let formData = new FormData();
    formData.append('id', id);
    return await ApiService.sendPostRequest(url, formData, token);
  };

  getProfile = async token => {
    const url = BaseUrl + EndPoints.GET_PROFILE;
    return await ApiService.sendGetRequest(url, token);
  };
  getAllBanks = async token => {
    const url = BaseUrl + EndPoints.GET_ALL_BANKS;
    return await ApiService.sendGetRequest(url, token);
  };

  serviceAgreement = async token => {
    const url = BaseUrl + EndPoints.SERVICE_AGREEMENT;
    const formData = new FormData();
    return await ApiService.sendPostRequest(url, formData, token);
  };

  categoriesList = async token => {
    const url = BaseUrl + EndPoints.LISTING_CATEGORIES;

    return await ApiService.sendGetRequest(url, token);
  };

  shopDetails = async token => {
    console.log('token', token);
    const url = BaseUrl + EndPoints.SHOP_DETAILS;

    return await ApiService.sendGetRequest(url, token);
  };

  vehicleInformation = async (
    vehicleType,
    vehicleNumber,
    licenseNumber,
    frontImage,
    backImage,
    token,
  ) => {
    const url = BaseUrl + EndPoints.VEHICLE_INFORMATION;
    let formData = new FormData();
    formData.append('vehicle_type', vehicleType);
    formData.append('vehicle_number', vehicleNumber);
    formData.append('license_image', {
      uri: frontImage.path,
      type: frontImage.mime,
      name: 'frontImage',
    });
    formData.append('license_back_image', {
      uri: backImage.path,
      type: backImage.mime,
      name: 'backImage',
    });
    formData.append('license_number', licenseNumber);

    return await ApiService.sendPostRequest(url, formData, token);
  };
  updateVehicleInformation = async data => {
    const url = BaseUrl + EndPoints.UPDATE_DRIVER;
    let formData = new FormData();
    data.vehicleType && formData.append('vehicle_type', data.vehicleType);
    data.registrationNumber &&
      formData.append('vehicle_number', data.registrationNumber);
    data.frontImage &&
      formData.append('license_image', {
        uri: data.frontImage.path,
        type: data.frontImage.mime,
        name: 'front_Image',
      });
    data.backImage &&
      formData.append('license_back_image', {
        uri: data.backImage.path,
        type: data.backImage.mime,
        name: 'back_Image',
      });
    data.drivinglicenseNumber &&
      formData.append('license_number', data.drivinglicenseNumber);
    data.id && formData.append('id', data.id);
    return await ApiService.sendPostRequest(url, formData, data.token);
  };
  registerUser = async (email, password, phoneNumber) => {
    const url = BaseUrl + EndPoints.SIGN_UP;
    console.log(url);

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone_number', phoneNumber);

    return await ApiService.sendPostRequest(url, formData);
  };
  addProduct = async (data, token) => {
    const url = BaseUrl + EndPoints.ADD_PRODUCT;
    console.log('23', data.is_variant);
    let formData = new FormData();
    data.title && formData.append('title', data.title);
    data.price && formData.append('price', data.price);
    data.total_quantity &&
      formData.append('total_quantity', data.total_quantity);
    data.product_images &&
      data.product_images.forEach((item, index) => {
        if (item.hasOwnProperty('path')) {
          formData.append(`product_images[${index}]`, {
            uri: item.path,
            type: item.mime,
            name: `Image[${index}]`,
          });
        } else if (item.hasOwnProperty('image_url')) {
          formData.append(`product_images[${index}]`, item.image_url);
        } else {
          console.log('noImage');
        }
      });
    data.discount && formData.append('discount', data.discount);
    data.services && formData.append('services', data.services);
    data.is_variant && formData.append('is_variant', data.is_variant);
    data.specifications &&
      formData.append('specifications', data.specifications);
    data.services && formData.append('services', data.services);
    data.product_variants &&
      data.product_variants.map((item, index) => {
        formData.append(`variants[color][${index}]`, item.color);
        item.properties.map((propertiesItem, propertiesIndex) => {
          formData.append(
            `variants[properties][${index}][${propertiesIndex}][quantity]`,
            propertiesItem.quantity,
          );
          formData.append(
            `variants[properties][${index}][${propertiesIndex}][size]`,
            propertiesItem.size,
          );
        });
      });

    return await ApiService.sendPostRequest(url, formData, token);
  };
  updateProduct = async (data, token) => {
    const url = BaseUrl + EndPoints.UPDATE_PRODUCT + '/' + data.slug;

    let formData = new FormData();
    data.title && formData.append('title', data.title);
    data.price && formData.append('price', data.price);
    data.category && formData.append('category', data.category.id);
    data.is_variant && formData.append('is_variant', data.is_variant);
    data.total_quantity &&
      formData.append('total_quantity', data.total_quantity);
    console.log(data.product_images);
    data.product_images &&
      data.product_images.forEach((item, index) => {
        if (item.hasOwnProperty('path')) {
          formData.append(`product_images[${index}]`, {
            uri: item.path,
            type: item.mime,
            name: `Image[${index}]`,
          });
        } else if (item.hasOwnProperty('image_url')) {
          formData.append(`product_images[${index}]`, item.image_url);
        } else {
          console.log('noImage');
        }
      });
    data.discount && formData.append('discount', data.discount);
    data.services && formData.append('services', data.services);

    data.specifications &&
      formData.append('specifications', data.specifications);
    data.services && formData.append('services', data.services);
    data.product_variants &&
      data.product_variants.map((item, index) => {
        formData.append(`variants[color][${index}]`, item.color);
        item.properties.map((propertiesItem, propertiesIndex) => {
          formData.append(
            `variants[properties][${index}][${propertiesIndex}][quantity]`,
            propertiesItem.quantity,
          );
          formData.append(
            `variants[properties][${index}][${propertiesIndex}][size]`,
            propertiesItem.size,
          );
        });
      });
    return await ApiService.sendPostRequest(url, formData, token);
  };
  addFeedBack = async (token, data) => {
    const url = BaseUrl + EndPoints.ADD_FEEDBACK;
    const formData = new FormData();
    console.log(data);
    data.map((item, index) => {
      item.product_id &&
        formData.append(`product_id[${index}]`, item.product_id);
      item.rating && formData.append(`rating[${index}]`, item.rating);
      item.description &&
        formData.append(`description[${index}]`, item.description);
      item?.order_id && formData.append(`order_id[${index}]`, item?.order_id);
    });

    return await ApiService.sendPostRequest(url, formData, token);
  };
  getAllProducts = async token => {
    const url = BaseUrl + EndPoints.GET_ALL_PRODUCTS;
    return await ApiService.sendGetRequest(url, token);
  };
  deleteProduct = async (token, slug) => {
    const url = BaseUrl + EndPoints.DELETE_PRODUCT + '/' + slug;
    console.log('url', url);
    const data = new FormData();

    return await ApiService.sendPostRequest(url, data, token);
  };
  getAllAddress = async token => {
    const url = BaseUrl + EndPoints.GET_ALL_ADDRESS;
    return await ApiService.sendGetRequest(url, token);
  };
  addAddress = async (data, token) => {
    console.log('data', data.id);
    const url = BaseUrl + EndPoints.ADD_ADDRESS;
    let formData = new FormData();
    formData.append('delivery_address', data.address);
    formData.append('name', data.name);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('city', data.city);
    formData.append('province', data.province);
    formData.append('address_label', data.address_label);
    formData.append('is_default', data.is_default);
    formData.append('phone_number', data.phone);
    return await ApiService.sendPostRequest(url, formData, token);
  };
  updateAddress = async (data, token) => {
    const url = BaseUrl + EndPoints.UPDATE_ADDRESS;
    let formData = new FormData();
    formData.append('delivery_address', data.address);
    formData.append('name', data.name);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('city', data.city);
    formData.append('province', data.province);
    formData.append('address_label', data.address_label);
    formData.append('default', data.is_default);
    formData.append('phone_number', data.phone);
    formData.append('id', data.id);
    return await ApiService.sendPostRequest(url, formData, token);
  };
  deleteAddress = async (id, token) => {
    const url = BaseUrl + EndPoints.DELETE_ADDRESS;
    let formData = new FormData();
    formData.append('id', id);
    return await ApiService.sendPostRequest(url, formData, token);
  };
  deliverySchedule = async (data, token) => {
    try {
      const response = await fetch(BaseUrl + EndPoints.DELIVERY_SCHEDULE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          return data;
        });
      if (response.code === 200 || response.code === 201) {
        return RESPONSE(true, response.message, response.data);
      } else {
        return RESPONSE(false, response.message, []);
      }
    } catch (errorResponse) {}
    return RESPONSE(false, errorResponse.message, []);
  };

  deleteAccount = async token => {
    const url = BaseUrl + EndPoints.DELETE_ACCOUNT;
    const formData = new FormData();
    return await ApiService.sendPostRequest(url, formData, token);
  };

  SaveCardToken = async (token, data) => {
    const url = BaseUrl + EndPoints.SAVE_CARD_TOKEN;
    return await ApiService.sendGetRequest(url, token);
  };
  SaveCard = async (token, data) => {
    try {
      const response = await fetch(BaseUrl + EndPoints.SAVE_CARD, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brandName: data.brandName,
          cardToken: data.cardToken,
          maskedPAN: data.maskedPAN,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          return data;
        });
      if (response.code === 200 || response.code === 201) {
        return RESPONSE(true, response.message, response.data);
      } else {
        return RESPONSE(false, response.message, []);
      }
    } catch (errorResponse) {
      return RESPONSE(false, errorResponse.message, []);
    }
  };

  getPaymentCards = async token => {
    const url = BaseUrl + EndPoints.PAYMENT_CARDS_LIST;
    return await ApiService.sendGetRequest(url, token);
  };
  deletePaymentCard = async (token, id) => {
    try {
      const response = await fetch(BaseUrl + EndPoints.DELETE_CARD, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({card_id: id, result: 'Successful'}),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          return data;
        });
      if (response.code === 200 || response.code === 201) {
        return RESPONSE(true, response.message, response.data);
      } else {
        return RESPONSE(false, response.message, []);
      }
    } catch (errorResponse) {
      return RESPONSE(false, errorResponse.message, []);
    }
  };
  cardTransaction = async (token, data) => {
    try {
      const response = await fetch(BaseUrl + EndPoints.CARD_TRANSACTION, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grand_total: data.grand_total.toFixed(2),
          card_id: data.card_id,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          return data;
        });
      console.log(response, 'response');

      if (response.code === 200 || response.code === 201) {
        return RESPONSE(true, response.message, response.data);
      } else {
        return RESPONSE(false, response.message, []);
      }
    } catch (errorResponse) {
      return RESPONSE(false, errorResponse.message, []);
    }
  };
  orderPlace = async (token, orderData) => {
    try {
      const response = await fetch(BaseUrl + EndPoints.PlACE_ORDER, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          return data;
        });
      if (response.code === 200 || response.code === 201) {
        return RESPONSE(true, response.message, response.data);
      } else {
        return RESPONSE(false, response.message, []);
      }
    } catch (errorResponse) {
      return RESPONSE(false, errorResponse.message, []);
    }
  };
  orderStatusUpdate = async (token, data) => {
    const url = BaseUrl + EndPoints.ORDER_STATUS_UPDATE;
    const formData = new FormData();
    formData.append('order_id', data.order_id);
    formData.append('order_status', data.status);
    return await ApiService.sendPostRequest(url, formData, token);
  };
  orderPendingList = async (token, queryParams) => {
    const url = BaseUrl + EndPoints.ORDER_PENDING_LIST;
    return await ApiService.sendGetRequest(url, token, queryParams);
  };
  Myorders = async (token, queryParams) => {
    const url = BaseUrl + EndPoints.MY_ORDERS;
    return await ApiService.sendGetRequest(url, token, queryParams);
  };
  OwnerOrders = async token => {
    const url = BaseUrl + EndPoints.ORDER_PENDING_LIST;
    return await ApiService.sendGetRequest(url, token);
  };

  getOrderByID = async (token, queryParams) => {
    const url = BaseUrl + EndPoints.GET_ORDER_BY_ID;
    return await ApiService.sendGetRequest(url, token, queryParams);
  };
  orderAssignToDriver = async (token, id) => {
    const url = BaseUrl + EndPoints.ORDER_ASSIGN_TO_DRIVER;
    const formData = new FormData();
    formData.append('order_id', id);
    return await ApiService.sendPostRequest(url, formData, token);
  };

  orderPickedUpDriver = async (token, id, status) => {
    console.log('status', status);
    const url = BaseUrl + EndPoints.ORDER_PICKED_UP_DRIVER;
    const formData = new FormData();
    formData.append('order_status', status);
    formData.append('order_id', id);
    return await ApiService.sendPostRequest(url, formData, token);
  };
  cancelOrder = async (token, id) => {
    const url = BaseUrl + EndPoints.ORDER_CANCEL;
    console.log('url', url);
    const formData = new FormData();
    formData.append('order_id', id);
    return await ApiService.sendPostRequest(url, formData, token);
  };
  orderRecieveAcknowledge = async (token, id) => {
    const url = BaseUrl + EndPoints.ACKNOWLEDGE_ORDER_BY_USER;
    const formData = new FormData();
    formData.append('order_id', id);

    return await ApiService.sendPostRequest(url, formData, token);
  };

  orderDeclineByDriver = async (token, id) => {
    const url = BaseUrl + EndPoints.ORDER_DECLINE_BY_DRIVER;
    const formData = new FormData();
    formData.append('order_id', id);

    return await ApiService.sendPostRequest(url, formData, token);
  };

  orderUnAssignToDriver = async (token, id) => {
    const url = BaseUrl + EndPoints.ORDER_UNASSIGN_TO_DRIVER;
    const formData = new FormData();
    formData.append('order_id', id);

    return await ApiService.sendPostRequest(url, formData, token);
  };

  // list of orders completed by driver
  ordersCompletedByDriver = async (token, paramQuery) => {
    const url = BaseUrl + EndPoints.ORDER_COMPLETED_BY_DRIVER;
    return await ApiService.sendGetRequest(url, token, paramQuery);
  };

  // list of orders cancelled by customer, accepted by driver
  ordersCancelledByCustomer = async (token, paramQuery) => {
    const url = BaseUrl + EndPoints.ORDER_CANCELLED_BY_CUSTOMER;
    return await ApiService.sendGetRequest(url, token, paramQuery);
  };

  totalShopEarning = async (token, paramQuery) => {
    const url = BaseUrl + EndPoints.TOTAL_SHOP_EARNING;
    const formData = new FormData();
    return await ApiService.sendGetRequest(url, token, paramQuery);
  };

  orderTransactionHistory = async (token, paramQuery) => {
    const url = BaseUrl + EndPoints.ORDER_TRANSACTION_HISTORY;
    const formData = new FormData();
    return await ApiService.sendGetRequest(url, token, paramQuery);
  };

  pendingFeedbackOrderList = async token => {
    const url = BaseUrl + EndPoints.PENDING_FEEDBACK_ORDER_LIST;
    return await ApiService.sendGetRequest(url, token);
  };

  getCurrentBalance = async token => {
    const url = BaseUrl + EndPoints.GET_CURRENT_BALANCE;
    return await ApiService.sendGetRequest(url, token);
  };

  widrawAmount = async (token, amount, bankId) => {
    const url = BaseUrl + EndPoints.WITHDRAW_AMOUNT;
    const formData = new FormData();
    console.log('amount', amount, 'bankId', bankId);
    formData.append('amount', amount);
    formData.append('bank_id', bankId);
    return await ApiService.sendPostRequest(url, formData, token);
  };

  // --------------------------
  fetchColleges = async () => {
    const url = BaseUrl + EndPoints.COLLEGE_LISTING;

    return await ApiService.sendGetRequest(url);
  };

  forgetPassword = async email => {
    const url = BaseUrl + EndPoints.FORGOT_PASSWORD;
    console.log('url', url);

    let formData = new FormData();
    formData.append('email', email);

    return await ApiService.sendPostRequest(url, formData);
  };

  forgetPasswordOtpVerification = async code => {
    const url = BASE_URL + EndPoints.FORGET_PASSWORD_OTP_VERIFICATION;

    let formData = new FormData();
    formData.append('code', code);

    return await ApiService.sendPostRequest(url, formData);
  };

  updatePassword = async (email, password, confirm_password) => {
    const url = BASE_URL + EndPoints.UPDATE_PASSWORD;

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);

    return await ApiService.sendPostRequest(url, formData);
  };

  userVerification = async otp => {
    const url = BASE_URL + EndPoints.USER_VERIFICATION;

    let formData = new FormData();
    formData.append('code', otp);

    return await ApiService.sendPostRequest(url, formData);
  };

  resendUserVerificationOTP = async email => {
    const url = BASE_URL + EndPoints.RESEND_USER_VERIFICATION_OTP;

    let formData = new FormData();
    formData.append('email', email);

    return await ApiService.sendPostRequest(url, formData);
  };

  // logout = async () => {
  //   const url = BASE_URL + EndPoints.LOGOUT;

  //   return await ApiService.sendPostRequest(url, "", true);
  // };

  delete_account = async () => {
    const url = BASE_URL + EndPoints.DELETE_ACCOUNT;

    return await ApiService.sendPostRequest(url, '', true);
  };

  fetchAnonymousUserName = async () => {
    const url = BASE_URL + EndPoints.ANONYMOUS_USERNAME;

    return await ApiService.sendPostRequest(url, '', true);
  };

  fetchUserProfile = async () => {
    const url = BASE_URL + EndPoints.USER_PROFILE;

    return await ApiService.sendPostRequest(url, '', true);
  };

  fetchHobbies = async () => {
    const url = BASE_URL + EndPoints.HOBBIES;

    return await ApiService.sendGetRequest(url, true);
  };

  fetchTypes = async () => {
    const url = BASE_URL + EndPoints.TYPES;

    return await ApiService.sendGetRequest(url, true);
  };

  createProfile = async ({
    anonymousUser,
    profileImage,
    name,
    classYear,
    gender,
    facebook,
    twitter,
    instagram,
    snapchat,
    linkedIn,
    hobbies,
    pronoun,
    bio,
  }) => {
    const url = BASE_URL + EndPoints.PROFILE_UPDATE;

    let formData = new FormData();
    formData.append('username_id', anonymousUser.id);
    if (profileImage && profileImage.path) {
      formData.append('image', {
        uri: profileImage.path,
        type: profileImage.mime,
        name: 'profilePic',
      });
    }
    formData.append('name', name);
    formData.append('year', classYear);
    formData.append('gender', gender);
    formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('instagram', instagram);
    formData.append('snapchat', snapchat);
    formData.append('linkedin', linkedIn);
    hobbies.map((hobby, index) => {
      formData.append('hobbies[' + index + ']', hobby);
    });

    pronoun.map((val, index) => {
      formData.append('pronoun[' + index + ']', val);
    });
    formData.append('bio', bio);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  updatePersonalProfile = async ({
    profileImage,
    name,
    classYear,
    gender,
    token,
  }) => {
    const url = BASE_URL + EndPoints.PROFILE_UPDATE;

    let formData = new FormData();

    if (profileImage && profileImage.path) {
      formData.append('image', {
        uri: profileImage.path,
        type: profileImage.mime,
        name: 'profilePic',
      });
    }

    formData.append('name', name);
    formData.append('year', classYear);
    formData.append('gender', gender);

    return await ApiService.sendPostRequest(url, formData, token);
  };

  updateSocialMediaLinks = async ({
    facebook,
    twitter,
    instagram,
    snapchat,
    linkedIn,
  }) => {
    const url = BASE_URL + EndPoints.SOCIAL_MEDIA_LINKS_UPDATE;

    let formData = new FormData();

    formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('instagram', instagram);
    formData.append('snapchat', snapchat);
    formData.append('linkedin', linkedIn);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  updateHobbies = async ({hobbies}) => {
    const url = BASE_URL + EndPoints.HOBBIES_UPDATE;

    if (hobbies.length > 0) {
      let formData = new FormData();

      hobbies.map((hobby, index) => {
        formData.append('hobbies[' + index + ']', hobby);
      });

      return await ApiService.sendPostRequest(url, formData, true);
    } else {
      return await ApiService.sendPostRequest(url, '', true);
    }
  };

  updateBio = async ({pronoun, bio}) => {
    const url = BASE_URL + EndPoints.BIO_UPDATE;

    let formData = new FormData();
    formData.append('bio', bio);
    pronoun.map((val, index) => {
      formData.append('pronoun[' + index + ']', val);
    });

    return await ApiService.sendPostRequest(url, formData, true);
  };

  addEvent = async ({
    title,
    date_time,
    location,
    type,
    is21Plus,
    rules,
    description,
    tags,
  }) => {
    const url = BASE_URL + EndPoints.EVENT_ADD;

    let formData = new FormData();

    formData.append('title', title);
    formData.append('date_time', date_time);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('is_21_plus', is21Plus);
    formData.append('rules', rules);
    formData.append('description', description);

    tags.map((tag, index) => {
      formData.append('tags[' + index + ']', tag);
    });

    return await ApiService.sendPostRequest(url, formData, true);
  };

  deleteEvent = async eventID => {
    const url = BASE_URL + EndPoints.EVENT_DELETE + '/' + eventID;

    return await ApiService.sendPostRequest(url, '', true);
  };

  updateEvent = async ({
    eventID,
    title,
    date_time,
    location,
    type,
    is21Plus,
    rules,
    description,
    tags,
  }) => {
    const url = BASE_URL + EndPoints.EVENT_UPDATE + '/' + eventID;

    let formData = new FormData();

    title && formData.append('title', title);
    date_time && formData.append('date_time', date_time);
    location && formData.append('location', location);
    type && formData.append('type', type);
    is21Plus && formData.append('is_21_plus', is21Plus);
    rules && formData.append('rules', rules);
    description && formData.append('description', description);

    tags.map((tag, index) => {
      formData.append('tags[' + index + ']', tag);
    });

    return await ApiService.sendPostRequest(url, formData, true);
  };

  fetchEvents = async ({
    page,
    join_event,
    my_event,
    tags,
    search,
    fromDate,
    toDate,
    type_id,
    sorting,
    blocked_events,
    host_user_id,
  }) => {
    const url = BASE_URL + EndPoints.EVENTS + '?page=' + page;

    let formData = new FormData();

    join_event && formData.append('join_event', join_event);
    host_user_id && formData.append('host_user_id', host_user_id);
    my_event && formData.append('my_event', my_event);
    search && formData.append('search', search);
    fromDate && formData.append('from_date', fromDate);
    toDate && formData.append('to_date', toDate);
    blocked_events && formData.append('blocked_events', blocked_events);
    sorting &&
      formData.append('order_by', sorting === 'Descending' ? 'desc' : 'asc');
    type_id &&
      type_id.map((type, index) => {
        formData.append('type_id[' + index + ']', type.id);
      });

    tags &&
      tags.map((tag, index) => {
        formData.append('tags[' + index + ']', tag);
      });

    return await ApiService.sendPostRequest(url, formData, true);
  };

  fetchEventsDetail = async eventID => {
    const url = BASE_URL + EndPoints.EVENT_DETAIL + '/' + eventID;

    return await ApiService.sendGetRequest(url, true);
  };

  fetchEventsAttendees = async eventID => {
    const url = BASE_URL + EndPoints.EVENT_ATTENDEES + '?event_id=' + eventID;

    return await ApiService.sendGetRequest(url, true);
  };

  joinEvent = async eventID => {
    const url = BASE_URL + EndPoints.JOIN_EVENT;

    let formData = new FormData();

    formData.append('event_id', eventID);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  cancelEvent = async eventID => {
    const url = BASE_URL + EndPoints.CANCEL_EVENT;

    let formData = new FormData();

    formData.append('event_id', eventID);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  updateEventStatus = async (eventID, status) => {
    const url = BASE_URL + EndPoints.EVENT_STATUS_UPDATE;

    let formData = new FormData();

    formData.append('event_id', eventID);
    formData.append('status', status);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  blockUnblockEvent = async (event_id, is_block_event) => {
    const url = BASE_URL + EndPoints.BLOCK_UNBLOCK_EVENT;

    let formData = new FormData();

    formData.append('event_id', event_id);
    formData.append('is_block_event', is_block_event);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  blockUnblockEventHost = async (user_id, is_block_user) => {
    const url = BASE_URL + EndPoints.BLOCK_UNBLOCK_EVENT_HOST;

    let formData = new FormData();

    formData.append('user_id', user_id);
    formData.append('is_block_user', is_block_user);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  blockUnblockUserFromSendingMessages = async (user_id, is_block_user) => {
    const url = BASE_URL + EndPoints.BLOCK_UNBLOCK_USER_MESSAGES;

    let formData = new FormData();

    formData.append('user_id', user_id);
    formData.append('is_block_user', is_block_user);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  updateRequestStatus = async (eventID, userID, status) => {
    const url = BASE_URL + EndPoints.REQUEST_STATUS_UPDATE;

    let formData = new FormData();

    formData.append('event_id', eventID);
    formData.append('user_id', userID);
    formData.append('status', status);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  report = async ({title, reason, images, reported_user_id, event_id}) => {
    const url = BASE_URL + EndPoints.REPORT;

    let formData = new FormData();

    formData.append('title', title);
    formData.append('reason', reason);

    images.map((image, index) => {
      formData.append('images[' + index + ']', {
        uri: image.path,
        type: image.mime,
        name: 'report_' + index,
      });
    });

    reported_user_id && formData.append('reported_user_id', reported_user_id);
    event_id && formData.append('event_id', event_id);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  fetchBlockedUsers = async () => {
    const url = BASE_URL + EndPoints.BLOCKED_USERS;

    return await ApiService.sendPostRequest(url, '', true);
  };

  fetchNotifications = async ({page}) => {
    const url = BASE_URL + EndPoints.NOTIFICATIONS + '?page=' + page;

    return await ApiService.sendGetRequest(url, true);
  };

  updateDeviceToken = async token => {
    const url = BASE_URL + EndPoints.DEVICE_TOKEN_UPDATE;

    let formData = new FormData();

    formData.append('device_token', token);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  checkIsReported = async ({event_id, user_id}) => {
    const url = BASE_URL + EndPoints.CHECK_REPORT;

    let formData = new FormData();

    event_id && formData.append('event_id', event_id);
    user_id && formData.append('user_id', user_id);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  fetchChatThreads = async () => {
    const url = BASE_URL + EndPoints.CHAT_THREADS;

    return await ApiService.sendGetRequest(url, true);
  };

  fetchChatMessages = async thread_id => {
    const url = BASE_URL + EndPoints.CHAT_MESSAGES + '?thread_id=' + thread_id;

    return await ApiService.sendGetRequest(url, true);
  };

  sendMessage = async (thread_id, message) => {
    const url = BASE_URL + EndPoints.SEND_MESSAGE;

    let formData = new FormData();

    formData.append('thread_id', thread_id);
    formData.append('message', message);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  fetchEventChatThread = async event_id => {
    const url = BASE_URL + EndPoints.EVENT_CHAT_THREAD;

    let formData = new FormData();

    formData.append('event_id', event_id);

    return await ApiService.sendPostRequest(url, formData, true);
  };

  fetchThreadUnreadCount = async () => {
    const url = BASE_URL + EndPoints.UNREAD_THREAD_COUNT;

    return await ApiService.sendGetRequest(url, true);
  };

  markOffline = async () => {
    const url = BASE_URL + EndPoints.MARK_OFFLINE;

    return await ApiService.sendPostRequest(url, '', true);
  };

  notificationGlobal = async enable => {
    const url = BASE_URL + EndPoints.GLOBAL_NOTIFICATION;
    const formData = new FormData();
    formData.append('enable', enable);
    return await ApiService.sendPostRequest(url, formData, true);
  };

  notificationEvent = async enable => {
    const url = BASE_URL + EndPoints.EVENT_NOTIFICATION;
    const formData = new FormData();
    formData.append('enable', enable);
    return await ApiService.sendPostRequest(url, formData, true);
  };
}

const ApiClient = new apiClient();
export default ApiClient;
