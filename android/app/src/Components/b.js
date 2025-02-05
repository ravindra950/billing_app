  <Modal
  visible={isSummaryModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setSummaryModalVisible(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
      <View style={styles.row}>
        <Text> {formData.customerName}</Text>
        <Text> {formData.invoiceNo}</Text>
        <Text> {formData.date}</Text>
      </View>
      
      {/* <View style={styles.row}>
        <Text>Total Amount: ₹ {formData.totalAmount}</Text>
        <Text>Balance: ₹ {formData.remainingAmount}</Text>
      </View> */}
      <View style={styles.row23}>
  <View style={styles.amountContainer23}>
    <Text>Total Amount:</Text>
    <Text style={styles.amount23}>₹ {formData.totalAmount}</Text>
  </View>
  <View style={styles.amountContainer23}>
    <Text>Balance:</Text>
    <Text style={styles.amount23}>₹ {formData.remainingAmount}</Text>
  </View>
  <TouchableOpacity style={styles.amountContainer23} 
  onPress={generatePDF}
  >
          {/* <Icon name="file-pdf" size={24} />
          <Text>Generate PDF</Text> */}
          <Image
                    source={require('../images/pdf1.png')}
                    style={styles.icon11}
                  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.amountContainer23}
         onPress={() => setSummaryModalVisible(false) }
         >
          {/* <Icon name="edit" size={24} />
          <Text>Edit</Text> */}
          <Image
                    source={require('../images/edit1.png')}
                    style={styles.icon11}
                  />
        </TouchableOpacity>
       
</View>

      {/* <View style={styles.row}> */}
        {/* PDF Icon */}
        {/* <TouchableOpacity style={styles.iconButton} onPress={generatePDF}> */}
          {/* <Icon name="file-pdf" size={24} />
          <Text>Generate PDF</Text> */}
          {/* <Image
                    source={require('../images/pdf1.png')}
                    style={styles.icon11}
                  /> */}
        {/* </TouchableOpacity> */}

        {/* Edit Icon */}
        {/* <TouchableOpacity style={styles.iconButton} onPress={() => setSummaryModalVisible(false)}> */}
          {/* <Icon name="edit" size={24} />
          <Text>Edit</Text> */}
          {/* <Image
                    source={require('../images/edit1.png')}
                    style={styles.icon11}
                  /> */}
        {/* </TouchableOpacity> */}
      {/* </View> */}

      
    </View>
  </View>
</Modal>
