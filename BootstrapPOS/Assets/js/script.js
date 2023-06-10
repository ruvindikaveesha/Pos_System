// ===============       navigation

$("#customer").css("display","block");
$("#item").css("display","none");
$("#order").css("display","none");
$("#details").css("display","none");

$("#customerNav").click(function () {
    $("#customer").css("display","block");
    $("#item").css("display","none");
    $("#order").css("display","none");
    $("#details").css("display","none");

});

$("#itemNav").click(function () {
    $("#customer").css("display","none");
    $("#item").css("display","block");
    $("#order").css("display","none");
    $("#details").css("display","none");
});

$("#orderNav").click(function () {
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#order").css("display","block");
    $("#details").css("display","none");
});

$("#detailsNav").click(function () {
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#order").css("display","none");
    $("#details").css("display","block");
});
// ===================      add to table

$("#btnSaveCustomer").click(function () {
    $("#customerTable>tr").off("click");
    let customerId = $("#txtCustId").val();
    let customerName = $("#txtCustName").val();
    let customerAddress = $("#txtCustAddress").val();
    let customerSalary = $("#txtCustSalary").val();

    let row = `<tr><td>${customerId}</td><td>${customerName}</td><td>${customerAddress}</td><td>${customerSalary}</td></tr>`;
    $("#customerTable").append(row);

    $("#customerTable>tr").click(function () {
        let cusId = $(this).children(":eq(0)").text();
        let cusName = $(this).children(":eq(1)").text();
        let cusAddress = $(this).children(":eq(2)").text();
        let cusSalary = $(this).children(":eq(3)").text();

        console.log(cusId,cusName,cusAddress,cusSalary);
        $("#txtCustId").val(cusId);
        $("#txtCustName").val(cusName);
        $("#txtCustAddress").val(cusAddress);
        $("#txtCustSalary").val(cusSalary);
    });

    $("#customerTable>tr").dblclick(function () {
        $(this).remove();
    });


})

$("#btnSaveCustomer").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
});

$("#btnSearchCus").click(function () {
    var searchID = $("#txtSearchCus").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#txtCustId").val(response.id);
        $("#txtCustName").val(response.name);
        $("#txtCustAddress").val(response.address);
        $("#txtCustSalary").val(response.salary);
    }else{
        clearAll();
        alert("No Such a Customer");
    }
});

function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i of customerDB) {
        /*create a html row*/
        let row = `<tr><td>${customerId}</td><td>${customerName}</td><td>${customerAddress}</td><td>${customerSalary}</td></tr>`;
        /*select the table body and append the row */
        $("#customerTable").append(row);
    }
}

function saveCustomer() {
    //gather customer information
    let customerID = $("#txtCustId").val();
    let customerName = $("#txtCustName").val();
    let customerAddress = $("#txtCustAddress").val();
    let customerSalary = $("#txtCustSalary").val();

    //create Object
    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    };

    customerDB.push(customerObject);
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

const cusIDRegEx  = /^(C00-)[0-9]{3,4}$/;
const cusNameRegEx  = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$('#txtCustId,#txtCustName,#txtCustAddress,#txtCustSalary').on('keydown',function (eventOb) {
    if (eventOb.key == "Tab"){
        eventOb.preventDefault();
    }
});

$('#txtCustId,#txtCustName,#txtCustAddress,#txtCustSalary').on('blur',function () {
    formValid();
});

$("txtCustId").on('keyup',function (eventOb) {
    setButton();
    if (eventOb.key == "Enter"){
        checkIfValid();
    }
    if (eventOb.key == "Control"){
        var typedCustomerID = $("#txtCustId").val();
        var srcCustomer =searchCustomerFormID(typedCustomerID);
        $("#txtCustId").val(srcCustomer.getCustomerID());
        $("#txtCustName").val(srcCustomer.getCustomerName());
        $("#txtCustAddress").val(srcCustomer.getCustomerAddress());
        $("#txtCustSalary").val(srcCustomer.getCustomerSalary());
    }
});

$("#txtCustName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter"){
        checkIfValid();
    }
});

$("#txtCustAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtCustSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#btnSaveCustomer").attr('disabled', true);

function clearAll(){
    $('#txtCustId,#txtCustName,#txtCustAddress,#txtCustSalary').val("");
    $('#txtCustID,#txtCutsName,#txtCustAddress,#txtCustSalary').css('border', '2px solid #ced4da');
    $('#txtCustID').focus();
    $("#btnSaveCustomer").attr('disabled', true);
    loadAllCustomers();
    $("#errorCusId,#errorCusName,#errorCusAddress,#errorCusSallary").text("");
}

function formValid(){
    var cusId = $("txtCustId").val();
    $("#txtCustId").css('border','2px solid green');
    $("errorCusId").text("");
    if (cusIDRegEx.test(cusId)) {
        var cusName = $("#txtCustName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCustName").css('border', '2px solid green');
            $("#errorCusName").text("");
            var cusAddress = $("#txtCustAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#txtCustSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtCustAddress").css('border', '2px solid green');
                $("#errorCusAddress").text("");
                if (resp) {
                    $("#txtCustSalary").css('border', '2px solid green');
                    $("#errorCusSallary").text("");
                    return true;
                } else {
                    $("#txtCustSalary").css('border', '2px solid red');
                    $("#errorCusSallary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtCustAddress").css('border', '2px solid red');
                $("#txtCustSalary").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtCustName").css('border', '2px solid red');
            $("#errorCusName").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCustId").css('border', '2px solid red');
        $("#errorCusId").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtCustId").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtCustName").focus();
        var cusName = $("#txtCustName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCustAddress").focus();
            var cusAddress = $("#txtCustAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtCustSalary").focus();
                var cusSalary = $("#txtCustSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtCustSalary").focus();
                }
            } else {
                $("#txtCustAddress").focus();
            }
        } else {
            $("#txtCustName").focus();
        }
    } else {
        $("#txtCustId").focus();
    }
}

$('#btnSaveCustomer').click(function () {
    checkIfValid();
});

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSaveCustomer").attr('disabled', false);
    } else {
        $("#btnSaveCustomer").attr('disabled', true);
    }
}

/*$("#txtCustId").keyup(function () {
    let input = $("#txtCustId").val();
    if (cusIDRegEx .test(input)){
        $("#txtCustId").css('border','2px solid green');
        $("#errorCusId").text("");
    }else{
        $("#txtCustId").css('border','2px solid red');
        $("#errorCusId").text("Wrong format : C00-001");
    }
});*/


