import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Image, FlatList } from 'react-native';
import { Menu, Button, IconButton, Provider, Icon } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
// import { PermissionsAndroid } from 'react-native';
import { Alert, PermissionsAndroid, Platform, Linking,ScrollView } from 'react-native';


export default function InvoiceForm() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuVisibleone, setMenuVisibleone] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [itemName,setItemName]=useState('')
  const [mobileNo,setMobileNo]=useState('');
  const [quantityr,setQuantityr]=useState('')
  const [rater,setRater]=useState('');
  const [menuVisiblerate, setMenuVisiblerate] = useState(false);
  const [menuVisiblecash, setMenuVisiblecash] = useState(false);
  const [menuVisiblefour, setMenuVisiblefour] = useState(false);

  const [paymentType, setPaymentType] = React.useState(null);
  const [showAddPayment, setShowAddPayment] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblefour, setModalVisiblefour] = useState(false);

  const [invoiceNo, setInvoiceNo] = useState('1');
  const [newInvoiceNo, setNewInvoiceNo] = useState(" ");
  const [selectedUnit, setSelectedUnit] = useState('Unit');
  const [selectedRupees, setSelectedRupees] = useState('Tax');
  const [selectedCash, setSelectedCash] = useState('Cash');
  const [selectedRole, setSelectedRole] = useState("Select Role"); // Default text

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setModalVisible(false);
  };

  // const handleSelectCustomer = (customer) => {
  //   setSelectedCustomer(customer);
  //   setModalVisible(false);
  // };
  const [customers, setCustomers] = useState([]); // List of customers
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Selected customer's details
  const userRole = "customer"; // or "admin"

  // Mock function to dynamically add customers
  const addDummyCustomer = () => {
    const id = customers.length + 1;
    setCustomers((prev) => [
      ...prev,
      {
        id: id.toString(),
        name: `Customer ${id}`,
        totalAmount: Math.floor(Math.random() * 1000), // Random total amount
        receivedAmount: Math.floor(Math.random() * 1000), // Random received amount
      },
    ]);
  };

  // Show details of the clicked customer
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalVisible(false); // Close modal
  };
  const [receivedAmount, setReceivedAmount] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('00.00');
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleone, setIsModalVisibleone] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState('Cheque');
  const [quantity, setQuantity] = useState("");
  const [isMenuVisible, setisMenuVisible] = useState(false);
  const [bankName, setBankName] = useState('');
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isSummaryModalVisible, setSummaryModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  const [paymentOptions, setPaymentOptions] = useState([
    { label: 'Cheque', image: require('../images/cash.png') },
    { label: 'Cash', image: require('../images/cash.png') },
    { label: 'Card', image: require('../images/card.jpg') },
]);
const totalAmount = parseFloat(rater || 0) * parseFloat(quantityr || '00.00');
const [isNewInvoiceFormVisible, setNewInvoiceFormVisible] = useState(false);

const [previousBills, setPreviousBills] = useState([
  
]);
const [currentInvoiceData, setCurrentInvoiceData] = useState({
  customerName: '',
  invoiceNo: '',
  date: '',
  totalAmount: '',
  receivedAmount: ''
});

const generateUniqueInvoiceNo = (baseNumber) => {
  let newNumber = baseNumber;

  while (existingInvoiceNos.includes(newNumber)) {
    let incrementedValue = (parseInt(newNumber, 10) + 1).toString(); 
    newNumber = incrementedValue;
  }

  return newNumber; 
};

const [existingInvoiceNos, setExistingInvoiceNos] = useState([
  '1', '2', '3' 
]);
const [newBillData, setNewBillData] = useState({
  customerName: '',
  invoiceNo: '',
  date: '',
  totalAmount: '',
  remainingAmount: '', 
  quantity: '',
  rate: '',
  mobileNo:''
});




const handleAddInvoice = () => {
  let errorMessage = '';

  if (!newBillData?.customerName?.trim()) {
    errorMessage += 'Customer Name is required.\n';
  }
  if (!newBillData?.totalAmount?.trim()) {
    errorMessage += 'Total Amount is required.\n';
  }
  if (!newBillData?.receivedAmount?.trim()) {
    errorMessage += 'Received Amount is required.\n';
  }


  if (errorMessage) {
    alert(errorMessage);
    return;
  }

  const lastInvoiceNo = previousBills[previousBills.length - 1]?.invoiceNo;
  const nextInvoiceNo = lastInvoiceNo ? String(parseInt(lastInvoiceNo) + 1) : '1';

  const newInvoice = {
    ...newBillData,
    invoiceNo: nextInvoiceNo,
    date: new Date().toISOString().split('T')[0],
  };

  setPreviousBills((prev) => [...prev, newInvoice]);

  setNewBillData({
    customerName: '',
    invoiceNo: '',
    date: '',
    totalAmount: '',
    remainingAmount: '',
    receivedAmount: '',
    setMobileNo:'',

  });

  setSummaryModalVisible(true);
};


const [formData, setFormData] = useState({
  customerName: '',
  invoiceNo: invoiceNo,
  date: date.toISOString().split('T')[0],
  totalAmount: totalAmount,
  remainingAmount: remainingAmount
});


const handleSubmit = () => {
  if (
    !customerName ||
    !phoneNumber ||
    !itemName ||
    !quantity ||
    !rate ||
    !receivedAmount
  ) {
    setErrorMessage("All fields are required.");
    return;
  }

  setErrorMessage('');

  setFormData({
    customerName: customerName,
    phoneNumber: phoneNumber,
    itemName: itemName,
    quantity: quantity,
    rate: rate,
    receivedAmount: receivedAmount,
    invoiceNo: invoiceNo,
    date: date.toISOString().split('T')[0], 
    totalAmount: parseFloat(quantity) * parseFloat(rate), 
    remainingAmount :parseInt(receivedAmount[receivedAmount.length - 1], 10) - parseFloat(totalAmount),
  });

  setSummaryModalVisible(true); 
};

  const handleAddPaymentType = () => {
    setIsAddingBank(false); 
    setModalVisiblefour(true);  
  };

  const handleAddBankAccount = () => {
    setIsAddingBank(true); 
  };

  const handleSaveBankName = () => {
    if (bankName.trim() !== '') {
        setPaymentOptions([
            ...paymentOptions,
            {
                label: bankName,
                image: require('../images/cash.png'), 
            },
        ]);
        setBankName('');
        setModalVisiblefour(false);

    }
};


  const handleToggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  const handleToggleModal1 = () => {
    setModalVisible(!isModalVisibleone);
  };

  const handleSelectPayment = (option) => {
    setSelectedPayment(option.label);
    setModalVisible(false);
  };
  // const handleTotalAmountChange = (value) => {
  //   setTotalAmount(value);
  //   validateInputs(value, receivedAmount);
  //   calculateRemainingAmount(value, receivedAmount);
  // };
  const handleTotalAmountChange = (field, value) => {
    const updatedBillData = { ...newBillData, [field]: value };
    setNewBillData(updatedBillData);
  
    const quantity = parseFloat(updatedBillData.quantity || '0');
    const rate = parseFloat(updatedBillData.rate || '0');
    const total = quantity * rate;
  
    setNewBillData({ ...updatedBillData, totalAmount: total.toString() });
  };
  

  const handleReceivedAmountChange = (value) => {
    setReceivedAmount(value);
    validateInputs(totalAmount, value);
    calculateRemainingAmount(totalAmount, value);
  };

  // const calculateRemainingAmount = (total, received) => {
  //   const totalNum = parseFloat(total) || 0;
  //   const receivedNum = parseFloat(received) || 0;
  //   const remaining = totalNum - receivedNum;
  //   setRemainingAmount(remaining >= 0 ? remaining.toFixed(2) : '0.00');
  // };

  
  const calculateRemainingAmount = () => {
    const total = parseFloat(newBillData.totalAmount || '0');
    const received = parseFloat(newBillData.receivedAmount || '0');
    const remaining = total - received;
  
    setRemainingAmount(remaining.toFixed(2)); // Two decimal places for consistency
  };
  const handleInputChange = (field, value) => {
    const updatedBillData = { ...newBillData, [field]: value };
    setNewBillData(updatedBillData);
  
    // Calculate remaining amount after updating inputs
    calculateRemainingAmount(updatedBillData);
  };
  
  const handleMenuToggle = () => {
    setMenuVisible(!menuVisible);
  };
  const handleMenuToggle1 = () => {
    setMenuVisiblerate(!menuVisiblerate);
  };
  const handleMenuToggle2 = () => {
    setMenuVisiblecash(!menuVisiblecash);
  };
  const handleModalOpen = () => {
    setNewInvoiceNo(invoiceNo);
    setModalVisible(true);
  };
  const handleSaveInvoice = () => {
    // Ensure the invoice number is valid
    if (!newInvoiceNo) {
      setErrorMessage("Invoice number is required.");
      return;
    }
  
    setInvoiceNo(newInvoiceNo); 
    setExistingInvoiceNos((prev) => [...prev, newInvoiceNo]); 
    setModalVisible(false); 
  };
  
  const handleSelectRupees = (ruppes) => {
    setSelectedRupees(ruppes);
    setMenuVisible(false);
  };


  const handleSelectCash = (Cash) => {
    setSelectedCash(Cash);
    setMenuVisibleone(false);
  };


  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setMenuVisible(false);
  };

  const handleDelete = () => {
    // Reset all state variables
    setCustomerName('');
    setInvoiceNo('');
    setDate(new Date());
    // setTotalAmount('');
    setRemainingAmount('');
    setReceivedAmount('');
    setSelectedUnit('');
    setSelectedCash('');
    setNewInvoiceNo('');
    setQuantity('');
    setMobileNo('');
    setQuantityr('');
    setRater('');
    setSelectedRupees('');
    setBankName('');
    setItemName('');
    Alert.alert("Success", "Form data has been deleted!");
  };
  
 
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs storage access to save PDF files.',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permission granted');
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            'Permission Denied',
            'Storage permission is permanently denied. Please enable it in the app settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ]
          );
          return false;
        } else {
          console.error('Permission denied');
          Alert.alert('Permission Denied', 'Storage permission is required to save the PDF.');
          return false;
        }
      } catch (error) {
        console.error('Permission error:', error);
        Alert.alert('Error', 'An unexpected error occurred while requesting permissions.');
        return false;
      }
    }
    return true; 
  };

  const generatePDF = async () => {
    console.log('PDF generation initiated.');

    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const htmlContent = `
      <h1>Invoice Details</h1>
      <p><strong>Customer Name:</strong> ${formData.customerName}</p>
      <p><strong>Invoice No:</strong> ${formData.invoiceNo}</p>
      <p><strong>Date:</strong> ${formData.date}</p>
      <p><strong>Total Amount:</strong> ₹${formData.totalAmount}</p>
      <p><strong>Balance:</strong> ₹${formData.remainingAmount}</p>
    `;

    const options = {
      html: htmlContent,
      fileName: `Invoice_${formData.invoiceNo || 'default'}`,
      directory: 'Documents',
    };

    try {
      const pdf = await RNHTMLtoPDF.convert(options);
      console.log('PDF File Created:', pdf.filePath);

      if (pdf.filePath) {
        Alert.alert('PDF Created', `PDF saved to: ${pdf.filePath}`);
        openPDF(pdf.filePath);
      } else {
        throw new Error('PDF file path is undefined');
      }
    } catch (error) {
      console.error('Error during PDF generation:', error);
      Alert.alert('Error', 'An error occurred while generating the PDF.');
    }
  };

  const openPDF = (filePath) => {
    FileViewer.open(filePath)
      .then(() => console.log('PDF successfully opened'))
      .catch((error) => {
        console.error('Error opening PDF:', error);
        Alert.alert('Error', 'An error occurred while opening the PDF.');
      });
  };
  <Image source={require('../images/drop.png')} style={styles.icon} />


  return (
    <View style={styles.container}>
      {/* Row 1 */}
      <View style={styles.row}>
    <Text style={styles.label}>Invoice No {invoiceNo}</Text>
    <TouchableOpacity style={styles.dropdown} onPress={handleModalOpen}>
      <Image source={require('../images/drop.png')} style={styles.icon} />
    </TouchableOpacity>

    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Change Invoice No</Text>
          <TextInput
            style={styles.input}
            
            value={newInvoiceNo}
            onChangeText={(text) => {
              setNewInvoiceNo(text);
              const uniqueInvoice = generateUniqueInvoiceNo(text);
              setNewInvoiceNo(uniqueInvoice); 
            }}
            placeholder="Enter new invoice number"
          />

          {errorMessage !== "" && <Text style={styles.error}>{errorMessage}</Text>}

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSaveInvoice}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setOpen(true)}>
          <Text style={styles.dateText}>
            {date.toISOString().split('T')[0]}
          </Text>
        </TouchableOpacity>
        <DatePicker
  modal
  open={open}
  date={date}
  mode="date"
  onConfirm={(selectedDate) => {
    setOpen(false);
    setDate(selectedDate);

    const formattedDate = selectedDate.toISOString().split('T')[0];
    setNewBillData({
      ...newBillData,
      date: formattedDate, 
    });

    setFormData({
      ...formData,
      date: formattedDate,
    });
  }}
  onCancel={() => setOpen(false)}
/>

      </View>

      <View style={styles.inputRow}>
        <TextInput placeholder="Customer Name"
     
    value={newBillData.customerName}
                  onChangeText={(text) =>
                    setNewBillData({ ...newBillData, customerName: text })
                  }
    style={styles.input} />
      </View>

      <View style={styles.inputRow}>
        <TextInput placeholder="Phone Number" 
         value={newBillData.mobileNo}
         onChangeText={(text) =>
           setNewBillData({ ...newBillData, mobileNo: text })
         }
         keyboardType="phone-pad" style={styles.input} 
        />
      </View>


      <View style={{ width: "100%" }}>
  <TouchableOpacity
    onPress={() => setModalVisible(true)}

  >
 
  <TextInput
  placeholder="+ Add Item"
  placeholderTextColor="blue"
  style={[styles.input23, { width: "100%", marginBottom: 7, textAlign: "center" }]} 
  editable={false}  />
   </TouchableOpacity>
</View>

{/* <Modal
  visible={modalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer22}>
    <View style={styles.modalContent22}>
      <Text style={styles.modalTitle22}>Add New Item</Text>

     
    <View style={styles.row22}>
        <View style={[styles.box22, styles.equalWidth22]}>
          <TextInput
            placeholder="Quantity"
            value={quantity}
            onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
            style={styles.input22}
          />
        </View>

        <View style={[styles.dropdownContainer22, styles.equalWidth22]}>
          <Menu
            visible={menuVisiblerate}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.dropdown22}
                onPress={handleMenuToggle1}
              >
                <View style={styles.dropdownContent22}>
                  <Text style={styles.dropdownText22}>{selectedRupees}</Text>
                  <Image
                    source={require("../images/drop.png")}
                    style={styles.icon22}
                  />
                </View>
              </TouchableOpacity>
            }
          >
            <Menu.Item
             onPress={() => handleSelectUnit("Kilogram")}
            title="Kilogram"
            />
            <Menu.Item
            onPress={() => handleSelectUnit("Liter")} title="Liter"
            />
 <Menu.Item
onPress={() => handleSelectUnit("Piece")} title="Piece"            />


          </Menu>
        </View>
      </View>


      <View style={styles.row22}>
        <View style={[styles.box22, styles.equalWidth22]}>
          <TextInput
            placeholder="Rate (Price/Unit)"
            keyboardType="numeric"
            style={styles.input22}
          />
        </View>

        <View style={[styles.dropdownContainer22, styles.equalWidth22]}>
          <Menu
            visible={menuVisiblerate}
            onDismiss={() => setMenuVisiblerate(false)}
            anchor={
              <TouchableOpacity
                style={styles.dropdown22}
                onPress={handleMenuToggle1}
              >
                <View style={styles.dropdownContent22}>
                  <Text style={styles.dropdownText22}>{selectedRupees}</Text>
                  <Image
                    source={require("../images/drop.png")}
                    style={styles.icon22}
                  />
                </View>
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => handleSelectRate("With Tax")}
              title="With Tax"
            />
            <Menu.Item
              onPress={() => handleSelectRate("Without Tax")}
              title="Without Tax"
            />
          </Menu>
        </View>
      </View>








      <TextInput
        placeholder="Discount"
        keyboardType="numeric"
        style={styles.input22}
      />

      <Text style={styles.totalText22}>Total: ₹ 00.00</Text>

      <View style={styles.buttonRow22}>
        <TouchableOpacity
          style={[styles.button22, styles.saveNewButton22]}
          onPress={() => {


          }}
        >
          <Text style={styles.buttonText22}>Save & New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button22, styles.saveButton22]}
          onPress={() => {


            setModalVisible(false);
          }}
        >
          <Text style={styles.buttonText22}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal> */}

      <View style={styles.inputRow}>
        <TextInput placeholder="Item Name"  
      
    value={newBillData.itemName}
    onChangeText={(text) =>
      setNewBillData({ ...newBillData, itemName: text })
    }
    style={styles.input1} />
      </View>


      <View style={styles.row1}>
        <View style={[styles.box1, styles.equalWidth1]}>
          <TextInput placeholder="Quantity" 
           value={newBillData.quantity}
           onChangeText={(text) => handleTotalAmountChange('quantity', text)}
    />
        </View>

        <View style={[styles.dropdownContainer1, styles.equalWidth1]}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity style={styles.dropdown1} onPress={handleMenuToggle}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText1}>{selectedUnit}</Text>
                  <Image
                    source={require('../images/drop.png')}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>


            }
          >
            <Menu.Item onPress={() => handleSelectUnit('Kilogram')} title="Kilogram" />
            <Menu.Item onPress={() => handleSelectUnit('Liter')} title="Liter" />
            <Menu.Item onPress={() => handleSelectUnit('Piece')} title="Piece" />
          </Menu>
        </View>
      </View>

      {/* Row 7 */}

      <View style={styles.row2}>
        <View style={[styles.box1, styles.equalWidth1]}>
          <TextInput placeholder="Rate (Price/Unit)" 
 value={newBillData.rate}
 onChangeText={(text) => handleTotalAmountChange('rate', text)}
         keyboardType="numeric" style={styles.input1} />
        </View>

        <View style={[styles.dropdownContainer1, styles.equalWidth1]}>
          <Menu
            visible={menuVisiblerate}
            onDismiss={() => setMenuVisiblerate(false)}
            anchor={
              <TouchableOpacity style={styles.dropdown1} onPress={handleMenuToggle1}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText1}>{selectedRupees}</Text>
                  <Image
                    source={require('../images/drop.png')}
                    style={styles.icon}
                  />
                </View>
              </TouchableOpacity>


            }
          >
            <Menu.Item onPress={() => handleSelectRupees('With Tax')} title="With Tax" />
            <Menu.Item onPress={() => handleSelectRupees('Without Tax')} title="Without Tax" />
          </Menu>
        </View>
      </View>
      


      <View style={styles.inputRow}>
        <TextInput placeholder="Total Amount" style={styles.input} keyboardType="numeric"


value={newBillData.totalAmount}
    onChangeText={(text) => handleInputChange('totalAmount', text)}
          editable={false} 
          // onChangeText={handleTotalAmountChange} 
          />
      </View>


      <View style={styles.inputRow}>
        <TextInput placeholder="Received Amount" style={styles.input} keyboardType="numeric"


value={newBillData.receivedAmount}
onChangeText={(text) => handleInputChange('receivedAmount', text)}

        />
      </View>

      <View style={styles.row30}>
        <View style={styles.box30}>
          <Text style={styles.label1}>Balance Due</Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.currencySymbol}>₹</Text>
          <Text style={styles.remainingAmount} value={newBillData.remainingAmount}
          onChangeText={(text) => handleInputChange('receivedAmount', text)}

          >{remainingAmount}
          
          </Text>
        </View>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

      </View>

      <View style={styles.row12}>

  <View style={styles.box12}>
    <Text style={styles.label12}>Payment Type</Text>
  </View>

  <View style={[styles.dropdownContainer1, styles.equalWidth1]}>
  <Menu
    visible={menuVisiblecash}
    onDismiss={() => setMenuVisiblecash(false)}
    anchor={
      <TouchableOpacity style={styles.dropdown15} onPress={handleMenuToggle2}>
        <View style={styles.dropdownContent}>
        <Image
            source={paymentOptions.find(option => option.label === selectedCash)?.image || require('../images/cash.png')}
            style={styles.icon12}
          />
          <Text style={styles.dropdownText1}>{selectedCash}</Text>
          <Image
            source={require('../images/drop.png')}  
            style={styles.dropdownIcon}
          />
        </View>
      </TouchableOpacity>
    }
  >
            <Menu.Item 
      onPress={() => handleSelectCash('Cheque')} 
      title={
        <View style={styles.menuItem}>
          <Image source={require('../images/cash.png')} style={styles.menuImage} />
          <Text style={styles.menuText}>Cheque</Text>
        </View>
      }
    />


    <Menu.Item 
      onPress={() => handleSelectCash('Cash')} 
      title={
        <View style={styles.menuItem}>
          <Image source={require('../images/cash.png')} style={styles.menuImage} />
          <Text style={styles.menuText}>Cash</Text>
        </View>
      }
    />
      <Menu.Item 
      onPress={() => handleSelectCash('Card')} 
      title={
        <View style={styles.menuItem}>
          <Image source={require('../images/card.jpg')} style={styles.menuImage} />
          <Text style={styles.menuText}>Card</Text>
        </View>
      }
    />
  
          </Menu>
        </View>
</View>


      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.label}>Payment Ref No</Text>
        </View>
        <View style={styles.box}>

          <TouchableOpacity style={styles.dropdown2}>
    <Text style={styles.referenceText}>References No</Text>
  </TouchableOpacity>


  <View style={styles.dottedLine} />
        </View>
      </View>

     

<View style={styles.row}>
        <TouchableOpacity onPress={handleAddPaymentType}>
          <Text style={styles.addText}>+ Add Payment Type</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisiblefour}
        animationType="slide"
        onRequestClose={() => setModalVisiblefour(false)}
      >
        <View style={styles.modalOverlay21}>
          <View style={styles.modalContent21}>
            <Text style={styles.modalTitle21}>Payment Type</Text>

            {!isAddingBank ? (
              <TouchableOpacity onPress={handleAddBankAccount}>
                <Text style={styles.addBankText}>+ Add Bank A/C</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TextInput
                  placeholder="Enter Bank Name"
                  value={bankName}
                  onChangeText={setBankName}
                  style={styles.input21}
                />
<TouchableOpacity
    style={{
      width:'30%',
        backgroundColor: 'green',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    }}
    onPress={handleSaveBankName}
>
    <Text style={{ color: 'black', fontWeight: 'bold' }}>Save</Text>
</TouchableOpacity>

              </>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.buttonRow}>
        <Button mode="contained" style={styles.deleteButton} onPress={handleDelete}>Delete</Button>
        <Button mode="contained" style={styles.submitButton}
        //  onPress={handleSubmit}
                            onPress={handleAddInvoice}

         >Submit</Button>
      </View>
      <Modal
      visible={isSummaryModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setSummaryModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
         <TouchableOpacity style={styles.addButton13} >
              <Text style={styles.addButtonText13}>Select Customer
              <Image
                    source={require('../images/drop1.png')}
                    style={styles.icon15}
                  />
              </Text>
            </TouchableOpacity> 
           
      
          <ScrollView>
            {previousBills.map((bill, index) => (
        <View key={index} style={styles.billContainer}>
          <View style={styles.row}>
          <Text style={[styles.label, styles.underlineText]}>Latest Invoice</Text>
          <Text style={styles.label}>#{bill.invoiceNo || invoiceNo}</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { textAlign: 'center' }]}>
              {bill.customerName}
            </Text>
          <TouchableOpacity style={styles.addButton12}>
            <Text style={styles.addButtonText12}>+ Add More Invoice</Text>
          </TouchableOpacity>
            <Text style={styles.label}>
              {bill.date || date.toISOString().split('T')[0]}
            </Text>
          </View>
                <View style={styles.row23}>
                  <View style={styles.amountContainer23}>
                    <Text>Total Amount:</Text>
                    <Text style={styles.amount23}>₹ {bill.totalAmount}</Text>
                  </View>
                  <View style={styles.amountContainer23}>
                    <Text>Balance:</Text>
                    <Text style={styles.amount23}>
  ₹ {bill.remainingAmount || (bill.totalAmount - bill.receivedAmount || 0).toFixed(2)}
</Text>
                    </View>
                  <TouchableOpacity onPress={() => generatePDF(bill)}>
                    <Image
                      source={require('../images/pdf4.png')}
                      style={styles.icon11}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity          onPress={() => setSummaryModalVisible(false) }
                  >
                    <Image
                      source={require('../images/edit8.png')}
                      style={styles.icon11}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity 
                  >
                    <Image
                      source={require('../images/delete9.png')}
                      style={styles.icon11}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

          
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setSummaryModalVisible(false)
                  
                }
              >
                <Text style={styles.addButtonText}> ₹ Add New Invoice</Text>
              </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    marginTop: 8,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputRow: {
    // marginBottom: -3,

  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: 'green',
  },
  label1: {
    fontSize: 16,
    marginBottom: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 4,
    color: 'red'
  },
  input1: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 4,
    color: 'red'
  },
  box: {
    flex: 1,
    marginRight: 10,
  },
  box30: {
    flex: 3,
  },
  box70: {
    flex: 7,

  },
  datepicker: {
    width: '50%',
    marginTop: 10,
  },
  dropdown: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  iconInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    marginTop: 10,
    alignItems: 'flex-start',

  },
  show: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  addText: {
    color: 'blue',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  submitButton: {
    backgroundColor: 'blue',
  },
  dropdown: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modalContainer: {
    width: '100%',
    height:'100%',
    backgroundColor: 'white',
    padding: 2,
    // borderRadius: 10,
    // elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  box1: {
    flex: 1,
    marginRight: 10, 
  },
  dropdownContainer1: {
    flex: 1,
    justifyContent: 'center', 
  },
  equalWidth1: {
    flex: 1, 
  },
  input1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10, 
    height: 50, 
    width: '100%', 
    fontSize: 16, 
  },
  dropdown1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    height: 50, 
    justifyContent: 'center', 
  },

  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    width: '100%',
  },

  dropdownText1: {
    fontSize: 16,
    color: '#000',
  },

  arrow: {
    fontSize: 16,
    color: '#000',
  },
  row30: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 16,
  },
  box30: {
    flex: 3,
    justifyContent: 'center',
  },
  box70: {
    flex: 7,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    fontSize: 14,
  },
  balanceDue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 

  },
  currencySymbol: {
    color: 'black',
    fontSize: 18,
    marginRight: 4,
  },
  remainingAmountInput: {
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 2,
    flex: 1,
  },
  balanceContainer: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  remainingAmount: {
    fontSize: 16,
    color: 'green',
  },
  icon: {
    width: 16,
    height: 16,
  },
  icon11: {
    width: 25,
    height: 25,
  },icon15: {
    marginTop:30,
    marginLeft:10,
    width: 20,
    height: 20,
  },
  icon12: {
    width: 25,
    height: 25,
    // backgroundColor:'blue'
  },



  icon12: {
    width: 24,
    height: 24,
  },

  row23: {
    flexDirection: 'row', // Keep values in the same row
    justifyContent: 'space-between', // Space out total and balance
    padding: 10,
  },
  amountContainer23: {
    alignItems: 'center', // Align total and balance to the center
  },
  amount23: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5, // Space between label and amount
  },

  row12: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 10,
    // paddingHorizontal: 10,
    marginTop:10,
    marginBottom:6
  },
  box12: {
    flex: 1,
  },
  label12: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown12: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  dropdownContent12: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownText12: {
    fontSize: 14,
  },
  dropdownIcon12: {
    marginLeft: 10,
  },
  modalOverlay12: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent12: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  option12: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  optionContent12: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionImage12: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  optionText12: {
    fontSize: 16,
  },






  inputRow22: { flexDirection: "row", marginBottom: 20 },
  iconInput22: { marginRight: 10 },
  input22: { flex: 1, borderWidth: 1, borderColor: "gray", borderRadius: 5,width:'100%' },
  modalContainer22: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent22: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle22: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  box22: { marginBottom: 15 },
  input22: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
  },

  input23: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: "100%", 
  },
  dropdownContainer22: { marginBottom: 15 },
  dropdown22: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownContent22: { flexDirection: "row", justifyContent: "space-between" },
  dropdownText22: { fontSize: 16 },
  icon22: { width: 12, height: 12, marginLeft: 5 },
  row22: { flexDirection: "row", justifyContent: "space-between" },
  equalWidth22: { flex: 1, marginHorizontal: 5 },
  totalText22: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  buttonRow22: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button22: { padding: 10, borderRadius: 5 },
  saveNewButton22: {
    backgroundColor: "blue",
    flex: 1,
    marginRight: 5,
  },
  saveButton22: { backgroundColor: "green", flex: 1, marginLeft: 5 },
  buttonText22: { color: "white", textAlign: "center" },

  menuItem: {
    flexDirection: 'row',  
    alignItems: 'center',  
    padding: 10,          
  },
  menuImage: {
    width: 20,    
    height: 20,
    marginRight: 10, 
  },
  menuText: {
    fontSize: 14,   
    color: '#000',  
  },
  dropdownIcon: {
    width: 12,             
    height: 12,             
  },
  referenceText: {
    fontSize: 16,   
    color: '#000',   
    marginBottom: 4, 
    textAlign:'center'
  },
  dottedLine: {
    borderStyle: 'dotted',  
    borderWidth: 1,         
    borderRadius: 1,        
    borderColor: 'black',   
    height: 1,             
    width: '100%',          
  },
  modalOverlay21: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent21: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle21: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addBankText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
  input21: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },

  saveButtonCustom: {
    width:'30%',
    backgroundColor: 'green', 
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonTextCustom: {
    color: 'black', 
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    // backgroundColor: '#ed1a3b',
    backgroundColor: '#0097b2',

    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addButton12: {
    marginLeft: 10,
    // backgroundColor: '#4CAF50',
    backgroundColor: '#0097b2',

    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText12: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  underlineText: {
    borderBottomWidth: 3,
  borderBottomColor: 'black', 
  alignSelf: 'flex-start',
  },
  addButton13: {
    width:'40%',
    marginLeft: 10,
    // backgroundColor: '#4CAF50',
    backgroundColor: '#0097b2',

    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'left',
    justifyContent: 'left',
    marginBottom:5,
    marginTop:5,
  },
  addButtonText13: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  billContainer:{
    // backgroundColor:'pink',
    backgroundColor: '#acc8f8',

     padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom:10
  }
,
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  roleOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  roleText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
