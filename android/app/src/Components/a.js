     <Modal
      visible={isSummaryModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setSummaryModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <ScrollView>
            {/* Display all bills */}
            {previousBills.map((bill, index) => (
              <View key={index} style={styles.billContainer}>
                <View style={styles.row}>
                  <Text>{bill.customerName}</Text>
                  <Text>{bill.invoiceNo}</Text>
                  <Text>{bill.date}</Text>
                </View>
                <View style={styles.row23}>
                  <View style={styles.amountContainer23}>
                    <Text>Total Amount:</Text>
                    <Text style={styles.amount23}>₹ {bill.totalAmount}</Text>
                  </View>
                  <View style={styles.amountContainer23}>
                    <Text>Balance:</Text>
                    <Text style={styles.amount23}>₹ {bill.remainingAmount}</Text>
                  </View>
                  <TouchableOpacity onPress={() => generatePDF(bill)}>
                    <Image
                      source={require('../images/pdf1.png')}
                      style={styles.icon11}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log('Edit invoice')}>
                    <Image
                      source={require('../images/edit1.png')}
                      style={styles.icon11}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Add New Invoice Button */}
            {!isNewInvoiceFormVisible && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setNewInvoiceFormVisible(true)}
              >
                <Text style={styles.addButtonText}>Add New Invoice</Text>
              </TouchableOpacity>
            )}

            {/* Form for New Invoice */}
            {isNewInvoiceFormVisible && (
              <View style={styles.form}>
                <TextInput
                  placeholder="Customer Name"
                  value={newBillData.customerName}
                  onChangeText={(text) =>
                    setNewBillData({ ...newBillData, customerName: text })
                  }
                  style={styles.input}
                />
                <TextInput
                  placeholder="Invoice No"
                  value={newBillData.invoiceNo}
                  onChangeText={(text) =>
                    setNewBillData({ ...newBillData, invoiceNo: text })
                  }
                  style={styles.input}
                />
                <TextInput
                  placeholder="Date"
                  value={newBillData.date}
                  onChangeText={(text) =>
                    setNewBillData({ ...newBillData, date: text })
                  }
                  style={styles.input}
                />
                <TextInput
                  placeholder="Total Amount"
                  value={newBillData.totalAmount}
                  onChangeText={(text) =>
                    setNewBillData({ ...newBillData, totalAmount: text })
                  }
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TextInput
                  placeholder="Remaining Amount"
                  value={newBillData.remainingAmount}
                  onChangeText={(text) =>
                    setNewBillData({ ...newBillData, remainingAmount: text })
                  }
                  keyboardType="numeric"
                  style={styles.input}
                />
                <View style={styles.formActions}>
                  <TouchableOpacity
                    onPress={handleAddInvoice}
                    style={styles.submitButton}
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setNewInvoiceFormVisible(false)}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>