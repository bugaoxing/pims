/**
 * Created by phoenix on 14/11/7.
 */
serverLocation = window.location.origin;
PRM.constant('PRMconf',
    {
        WEBROOTURL: serverLocation + '/autotest/',
        MONGOQUERY: serverLocation + '/autotest/v1/service/',
        DEFAULT_PAGE_SIZE: 10,
        PRODUCTS_PAGE_SIZE: 10,
        NOT_IN_BROUGHT_LIST_CHECK: function (userAccount, accountList) {

        },
        GET_FORMATED_DATE_TODAY: function () {
            var date = new Date();
            var result = parseInt(date.getTime());
            return result;
        },
        isNullOrEmptyOrUndefined: function (value) {
            return !value;
        },
        by: function (name, minor) {
            return function (o, p) {
                var a, b;
                if (o && p && typeof o === 'object' && typeof p === 'object') {
                    a = o[name];
                    b = p[name];
                    if (a === b) {
                        return typeof minor === 'function' ? minor(o, p) : 0;
                    }
                    if (typeof a === typeof b) {
                        return a < b ? -1 : 1;
                    }
                    return typeof a < typeof b ? -1 : 1;
                } else {
                    throw("error");
                }
            }
        },
        genCVS: function (JSONData, deleteArray, showLabel) {

            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

            for (var index = 0; index < arrData.length; index++) {
                if (null != deleteArray) {
                    for (var x = 0; x < deleteArray.length; x++)
                        delete arrData[index][deleteArray[x]];
                }

            }
            var CSV = "\ufeff";


            //Set Report title in first row or line


            //This condition will generate the Label/Header
            if (showLabel) {
                var row = "";

                //This loop will extract the label from 1st index of on array
                for (var index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                var row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (var index in arrData[i]) {
                    var coulmn = arrData[i][index];
                    if(typeof(coulmn) == "number" && (coulmn+'').length == 13){
                        coulmn = $filter('date')(new Date(coulmn), "yyyy-MM-ddTHH:mm:ss.sssZ");
                    }else
                    if (typeof(coulmn) == 'object') {
                        coulmn = JSON.stringify(coulmn);
                    }

                    if (typeof(coulmn) == "string") {
                        coulmn = coulmn.replace(/\"/g, "\"\"");
                    }
                    row += '"' + coulmn + '",';
                    //row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV == '') {
                alert("Invalid data");
                return;
            }

            //Generate a file name
            var fileName = "Cal_OutPut" + "_"+new Date().getTime();
            //this will remove the blank-spaces from the title and replace it with an underscore
            //fileName += ReportTitle.replace(/ /g, "_");

            //Initialize file format you want csv or xls
            CSV = new Blob([CSV], {type: 'text/csv'});
            var uri = URL.createObjectURL(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


        },
        typeJudger: function (obj) {
            var type = typeof obj;
            if (type.toString() == "number") {
                if (obj > 1000000000000) {
                    return "date";
                } else {
                    return "number";
                }
            } else {
                return type.toString();
            }
        }
    });

