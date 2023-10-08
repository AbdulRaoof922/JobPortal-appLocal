import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ApplyJob = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.jobBox}>
        <View style={styles.imageView}>
          <Image
            source={require('../assets/shell4x.png')}
            style={styles.imageStyles}
          />
        </View>
        <Text style={styles.jobTitle}>Senior UI/UX Designer</Text>
        <Text style={styles.companyTitle}>Shell</Text>
        <View style={styles.selectDateSection}>
          <Text style={styles.chooseAResume}>Choose a Resume</Text>
          <TouchableOpacity style={styles.dateBtn}>
            <View style={styles.btnText}>
              <Text style={styles.date}>20 July, 2023</Text>
              <Text style={styles.btnTitle}>UI UX/ Designer</Text>
            </View>
            <Icon name="check" color="#FFF" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dateBtn,
              {backgroundColor: 'rgba(63, 110, 236, 0.21)'},
            ]}>
            <View style={styles.btnText}>
              <Text style={[styles.date, {color: '#000'}]}>20 July, 2023</Text>
              <Text style={[styles.btnTitle, {color: '#000'}]}>
                UI UX/ Designer
              </Text>
            </View>
            <Icon name="check" color="#000" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.attechCV}>
          <Text style={styles.attechCVTitle}>Attached CV From Phone</Text>
          <TouchableOpacity style={styles.uploadResumeBtn}>
            <Icon name="file-document-outline" size={30} color="blue" />
            <View style={styles.attechCVTextSection}>
              <Text style={styles.attechFilesText}>Attached File</Text>
              <Text style={styles.attechDocTypeText}>Doc, dox, pots, pdf</Text>
            </View>
            <TouchableOpacity style={styles.chooseBtn}>
              <Text style={styles.chooseBtnText}>Choose</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.applyBtn} onPress={()=>navigation.navigate('AppliedJobs')}>
            <Text style={styles.applyBtnText}>Apply now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  jobBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderColor: 'rgba(63, 110, 236, 0.28)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 30,
    width: '90%',
    alignSelf: 'center',
    marginTop: 50,
  },
  imageStyles: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  imageView: {
    borderWidth: 1,
    borderColor: 'rgba(217, 217, 217, 0.67)',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
  },
  jobTitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'MartelSans-Regular',
    marginTop: 20,
  },
  companyTitle: {
    color: '#3F6EEC',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'MartelSans-Regular',
  },
  selectDateSection: {
    marginTop: 20,
    width: '100%',
  },
  chooseAResume: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'MartelSans-Regular',
    textAlign: 'left',
  },
  dateBtn: {
    backgroundColor: '#3F6EEC',
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    padding: 10,
    marginTop: 10,
  },
  date: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'MartelSans-Regular',
    textAlign: 'left',
  },
  btnTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'MartelSans-Regular',
    textAlign: 'left',
  },
  attechCVTitle: {
    color: '#000',
    fontFamily: 'Rothek-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    textAlign: 'left',
  },
  attechCV: {
    marginTop: 20,
    width: '100%',
  },
  uploadResumeBtn: {
    borderColor: 'rgba(37, 108, 252, 0.33)',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  attechCVTextSection: {
    marginLeft: 10,
    width: '65%',
  },
  attechFilesText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'MartelSans-Regular',
    textAlign: 'left',
  },
  attechDocTypeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'MartelSans-Regular',
    textAlign: 'left',
  },
  chooseBtn: {
    backgroundColor: '#3F6EEC',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'flex-end',
  },
  chooseBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'MartelSans-Regular',
    textAlign: 'left',
  },
  applyBtn: {
    width: '100%',
    backgroundColor: '#3F6EEC',
    borderRadius: 10,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  applyBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'MartelSans-Regular',
    textAlign: 'left',
  },
});

export default ApplyJob;
