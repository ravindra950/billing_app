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