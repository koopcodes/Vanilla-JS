function go() {

  getInitial();
  createNewSheet();
  getEDOAdata();
  getEDODdata();
  sort();
  updateCounts();

}

function getInitial() {
  var source = DocsList.find("EDOD");
  var sourceid = source[0].getId();
  var sourcefile = SpreadsheetApp.openById(sourceid);
  var lastRow = sourcefile.getLastRow();
  var dest = DocsList.find("Admission Forecast Script");
  var destid = dest[0].getId();
  var destfile = SpreadsheetApp.openById(destid);
  iTotalCount = (lastRow-1);
  var therapRange = sourcefile.getRange("H2:H"+lastRow).getValues();
  iTeenCount = 0, iYaCount = 0, iMaleCount = 0, iFemaleCount = 0, iMautzCount = 0, iMosesCount = 0, iAdamsCount = 0, iSullivanCount = 0, iBaldwinCount = 0, iBinghamCount = 0, iKasenchakCount = 0, iWeldCount = 0;

  for (i=2; i<lastRow+1; i++) {
    if (sourcefile.getRange("D"+i).getValue()<18) {
      iTeenCount++
        } else {
          iYaCount++
            }

    if (sourcefile.getRange("C"+i).getValue() == "M") {
      iMaleCount++;
    } else {
      iFemaleCount++;
    }

    if (sourcefile.getRange("H"+i).getValue() == "Toby Mautz") {
        iMautzCount++;
        }

    if (sourcefile.getRange("H"+i).getValue() == "Hilary Moses") {
        iMosesCount++;
        }

    if (sourcefile.getRange("H"+i).getValue() == "Jason Adams") {
        iAdamsCount++;
        }

    if (sourcefile.getRange("H"+i).getValue() == "Mike Sullivan") {
        iSullivanCount++;
        }

    if (sourcefile.getRange("H"+i).getValue() == "Lindsey  Baldwin") {
        iBaldwinCount++;
        }

    if (sourcefile.getRange("H"+i).getValue() == "Alexander Bingham") {
        iBinghamCount++;
        }

    if (sourcefile.getRange("H"+i).getValue() == "Katie Kasenchak") {
            iKasenchakCount++;
            }

    if (sourcefile.getRange("H"+i).getValue() == "Kelly Weld") {
            iWeldCount++;
        }
  }

}


function createNewSheet() {
  var dest = DocsList.find("Admission Forecast Script");
  var destid = dest[0].getId();
  var ss = SpreadsheetApp.openById(destid);
  var sheet = ss.getSheets()[0];
  var today = new Date();
  var todayformat = Utilities.formatDate(today,'GMT-8','MM/dd/yyyy');
  var user = Session.getActiveUser().getUsername();
  sheet.clear();
  sheet.getRange("N1").setValue("Last Run on:"+todayformat+" by "+user);
  sheet.getRange("A1").setValue("Initial Counts:");
  //iTotalCount = Browser.inputBox("Initial Total Count:");
  sheet.getRange("M2").setValue("Initial Total: "+iTotalCount);
  //iYaCount = Browser.inputBox("Initial YA Count");
  sheet.getRange("J2").setValue("YA: "+iYaCount);
  //iTeenCount = Browser.inputBox("Initial Teen Count");
  sheet.getRange("I2").setValue("Teen: "+iTeenCount);
  //iMaleCount = Browser.inputBox("Initial Male Count");
  sheet.getRange("K2").setValue("Male: "+iMaleCount);
  //iFemaleCount = Browser.inputBox("Initial Female Count:");
  sheet.getRange("L2").setValue("Female: "+iFemaleCount);
  //iMautzCount = Browser.inputBox("Initial Toby Mautz Count:");
  sheet.getRange("A2").setValue("Mautz: "+iMautzCount);
  //iMosesCount = Browser.inputBox("Initial Hillary Moses Count:");
  sheet.getRange("B2").setValue("Moses: "+iMosesCount);
  //iAdamsCount = Browser.inputBox("Initial Jason Adams Count:");
  sheet.getRange("C2").setValue("Adams: "+iAdamsCount);
  //iSullivanCount = Browser.inputBox("Initial Mike Sullivan Count:");
  sheet.getRange("D2").setValue("Sullivan: "+iSullivanCount);
  //iBaldwinCount = Browser.inputBox("Initial Lindsey Baldwin Count:");
  sheet.getRange("E2").setValue("Baldwin: "+iBaldwinCount);
  //iBinghamCount = Browser.inputBox("Initial Alex Bingham Count:");
  //sheet.getRange("F2").setValue("Bingham: "+iBinghamCount);
  sheet.getRange("F2").setValue("Kasenchak: "+iKasenchakCount);
  sheet.getRange("G2").setValue("Weld: "+iWeldCount);

  if (+iYaCount + +iTeenCount != +iTotalCount) {
    Browser.msgBox("YA + Teen does not equal Total");
  }
  if (+iMaleCount + +iFemaleCount != +iTotalCount) {
    Browser.msgBox("Male + Female does not equal Total");
  }
   if (+iMautzCount + +iMosesCount + +iAdamsCount + +iSullivanCount + +iBaldwinCount + +iBinghamCount + +iKasenchakCount + +iWeldCount != +iTotalCount) {
    Browser.msgBox("Therapist totals do not equal Total");
  }
  sheet.getRange("A4").setValue("Date");
  sheet.getRange("B4").setValue("Date Type");
  sheet.getRange("C4").setValue("First Name");
  sheet.getRange("D4").setValue("Last Name");
  sheet.getRange("E4").setValue("Age");
  sheet.getRange("F4").setValue("Gender");
  sheet.getRange("G4").setValue("Therapist");
  sheet.getRange("H4").setValue("Th. Count");
  sheet.getRange("I4").setValue("Teen");
  sheet.getRange("J4").setValue("YA");
  sheet.getRange("K4").setValue("Male");
  sheet.getRange("L4").setValue("Female");
  sheet.getRange("M4").setValue("Total");
  sheet.getRange("N4").setValue("Referrer");
  sheet.getRange("A4:N4").setFontWeight("bold");
  sheet.getRange("A4:N4").setBackground("#bebebe");
  sheet.getRange("A4:N4").setBorder(true, true, true, true, false, false);
}

function getEDOAdata() {
  var source = DocsList.find("EDOA");
  var sourceid = source[0].getId();
  var dest = DocsList.find("Admission Forecast Script");
  var destid = dest[0].getId();
  var sourcefile = SpreadsheetApp.openById(sourceid);
  var destfile = SpreadsheetApp.openById(destid);
  var lastRow = sourcefile.getLastRow()

  var dates = sourcefile.getRange("G2:G"+lastRow).getValues();
  destfile.getRange("A5:A"+(+lastRow + 3)).setValues(dates);

  var names = sourcefile.getRange("A2:B"+lastRow).getValues();
  destfile.getRange("C5:D"+(+lastRow + 3)).setValues(names);

  var gender = sourcefile.getRange("C2:C"+lastRow).getValues();
  destfile.getRange("F5:F"+(+lastRow + 3)).setValues(gender);

  var age = sourcefile.getRange("E2:E"+lastRow).getValues();
  destfile.getRange("E5:E"+(+lastRow + 3)).setValues(age);

  var therapist = sourcefile.getRange("I2:I"+lastRow).getValues();
  destfile.getRange("G5:G"+(+lastRow + 3)).setValues(therapist);

  var ref = sourcefile.getRange("J2:J"+lastRow).getValues();
  destfile.getRange("N5:N"+(+lastRow + 3)).setValues(ref);

  destfile.getRange("B5:B"+(+lastRow + 3)).setValue('Arrival');

  for (i=2; i<(lastRow+1); i++) {
    if (sourcefile.getRange("K"+i).getValues() != "This is the default text.") {
      var newDate = sourcefile.getRange("K"+i).getValues();
      destfile.getRange("A"+(i+3)).setValues(newDate);
      destfile.getRange("A"+(i+3)).setFontColor("#00CC00");
      destfile.getRange("A"+(i+3)).setFontWeight("bold");
    }
    }

}

function getEDODdata() {
  var source = DocsList.find("EDOD");
  var sourceid = source[0].getId();
  var dest = DocsList.find("Admission Forecast Script");
  var destid = dest[0].getId();
  var sourcefile = SpreadsheetApp.openById(sourceid);
  var destfile = SpreadsheetApp.openById(destid);
  var lastRow = sourcefile.getLastRow();
  var lastRowDest = destfile.getLastRow();

  var dates = sourcefile.getRange("E2:E"+lastRow).getValues();
  destfile.getRange("A"+(lastRowDest+1)+":A"+(lastRowDest+lastRow-1)).setValues(dates);

  var names = sourcefile.getRange("A2:B"+lastRow).getValues();
  destfile.getRange("C"+(lastRowDest+1)+":D"+(lastRow+lastRowDest-1)).setValues(names);

  var gender = sourcefile.getRange("C2:C"+lastRow).getValues();
  destfile.getRange("F"+(lastRowDest+1)+":F"+(lastRow+lastRowDest-1)).setValues(gender);

  var age = sourcefile.getRange("D2:D"+lastRow).getValues();
  destfile.getRange("E"+(lastRowDest+1)+":E"+(lastRow+lastRowDest-1)).setValues(age);

  var therapist = sourcefile.getRange("H2:H"+lastRow).getValues();
  destfile.getRange("G"+(lastRowDest+1)+":G"+(lastRow+lastRowDest-1)).setValues(therapist);

  var ref = sourcefile.getRange("I2:I"+lastRow).getValues();
  destfile.getRange("N"+(lastRowDest+1)+":N"+(lastRow+lastRowDest-1)).setValues(ref);

  destfile.getRange("B"+(lastRowDest+1)+":B"+(lastRow+lastRowDest-1)).setValue('Departure');

  for (i=lastRowDest+1; i<(lastRow+lastRowDest); i++) {
    if (destfile.getRange("A"+i).getValues() == "") {
      var newDate = sourcefile.getRange("G"+(i-lastRowDest+1)).getValues();
      destfile.getRange("A"+i).setValues(newDate);
      destfile.getRange("A"+i).setFontColor("#CC0000");
      destfile.getRange("A"+i).setFontWeight("bold");
    }
  }
}

function sort() {

    var dest = DocsList.find("Admission Forecast Script");
    var destid = dest[0].getId();
    var ss = SpreadsheetApp.openById(destid);
    var lastRow = ss.getLastRow();
    var range = ss.getRange("A5:N"+lastRow);
    range.sort([{column: 1, ascending: true}, {column: 2, ascending: true}]);

}

function updateCounts() {
  var TotalCount=iTotalCount;
  var YaCount=iYaCount;
  var TeenCount=iTeenCount;
  var MaleCount=iMaleCount;
  var FemaleCount=iFemaleCount;
  var MautzCount=iMautzCount;
  var MosesCount=iMosesCount;
  var AdamsCount=iAdamsCount;
  var SullivanCount=iSullivanCount;
  var BaldwinCount=iBaldwinCount;
  var BinghamCount=iBinghamCount;
  var KasenchakCount=iKasenchakCount;
  var WeldCount=iWeldCount;

  var dest = DocsList.find("Admission Forecast Script");
  var destid = dest[0].getId();
  var ss = SpreadsheetApp.openById(destid);
  var sheet = ss.getSheetByName('Sheet1');
  var lastRow = ss.getLastRow();

  for (i=5; i<(lastRow+1); i++) {
    var age = ss.getRange("E"+i).getValue();
    var gender = ss.getRange("F"+i).getValue();
    var status = ss.getRange("B"+i).getValue();
    var therapist = ss.getRange("G"+i).getValue();
    //Logger.log(i);
    //Logger.log(status);


    if (status=="Arrival") {

      sheet.getRange(i,1,1,14).setFontWeight("bold")
        Logger.log(i);

      if (age < 18) {
        TeenCount++;
      } else {
        YaCount++;
      }

      ss.getRange("I"+i).setValue(TeenCount);
      ss.getRange("J"+i).setValue(YaCount);

      if (gender == "M") {
        MaleCount++;
      } else {
        FemaleCount++;
      }

      ss.getRange("K"+i).setValue(MaleCount);
      ss.getRange("L"+i).setValue(FemaleCount);

    switch(therapist)
    {
      case "Toby Mautz":
        MautzCount++;
        ss.getRange("H"+i).setValue(MautzCount);
        if (MautzCount > 10) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Hilary Moses":
        MosesCount++;
        ss.getRange("H"+i).setValue(MosesCount);
        if (MosesCount > 2) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Jason Adams":
        AdamsCount++;
        ss.getRange("H"+i).setValue(AdamsCount);
        if (AdamsCount > 8) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Mike Sullivan":
        SullivanCount++;
        ss.getRange("H"+i).setValue(SullivanCount);
        if (SullivanCount > 10) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Lindsey  Baldwin":
        BaldwinCount++;
        ss.getRange("H"+i).setValue(BaldwinCount);
        if (BaldwinCount > 10) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Alexander Bingham":
        BinghamCount++;
        ss.getRange("H"+i).setValue(BinghamCount);
        if (BinghamCount > 10) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Katie Kasenchak":
        KasenchakCount++;
        ss.getRange("H"+i).setValue(KasenchakCount);
        if (KasenchakCount > 3) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Kelly Weld":
        WeldCount++;
        ss.getRange("H"+i).setValue(WeldCount);
        if (WeldCount > 3) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
      break;
    }

    TotalCount++;
    ss.getRange("M"+i).setValue(TotalCount);

    //if (ss.getRange("B"+i).getValue()=='Arrival') {sheet.getRange(i,1,i,14).setFontWeight("bold")};
    //Logger.log(ss.getRange("B"+i));


  } else {
  if (age < 18) {
     TeenCount--;
    } else {
      YaCount--;
    }

    ss.getRange("I"+i).setValue(TeenCount);
    ss.getRange("J"+i).setValue(YaCount);

    if (gender == "M") {
     MaleCount--;
    } else {
      FemaleCount--;
    }

    ss.getRange("K"+i).setValue(MaleCount);
    ss.getRange("L"+i).setValue(FemaleCount);

    switch(therapist)
    {
      case "Toby Mautz":
        MautzCount--;
        ss.getRange("H"+i).setValue(MautzCount);
        if (MautzCount > 10) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
        if (MautzCount == 10) {ss.getRange("H"+i).setBackground("#00CC00"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Hilary Moses":
        MosesCount--;
        ss.getRange("H"+i).setValue(MosesCount);
        if (MosesCount > 2) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
        if (MosesCount == 2) {ss.getRange("H"+i).setBackground("#00CC00"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Jason Adams":
        AdamsCount--;
        ss.getRange("H"+i).setValue(AdamsCount);
        if (AdamsCount > 8) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
        if (AdamsCount == 8) {ss.getRange("H"+i).setBackground("#00CC00"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Mike Sullivan":
        SullivanCount--;
        ss.getRange("H"+i).setValue(SullivanCount);
        if (SullivanCount > 10) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
        if (SullivanCount == 10) {ss.getRange("H"+i).setBackground("#00CC00"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Lindsey  Baldwin":
        BaldwinCount--;
        ss.getRange("H"+i).setValue(BaldwinCount);
        if (BaldwinCount > 10) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
        if (BaldwinCount == 10) {ss.getRange("H"+i).setBackground("#00CC00"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Alexander Bingham":
        BinghamCount--;
        ss.getRange("H"+i).setValue(BinghamCount);
        if (BinghamCount > 10) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
        if (BinghamCount == 10) {ss.getRange("H"+i).setBackground("#00CC00"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Katie Kasenchak":
        KasenchakCount--;
        ss.getRange("H"+i).setValue(KasenchakCount);
        if (KasenchakCount > 3) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
        if (KasenchakCount == 3) {ss.getRange("H"+i).setBackground("#00CC00"); ss.getRange("H"+i).setFontWeight("bold")};
      break;

      case "Kelly Weld":
        WeldCount--;
        ss.getRange("H"+i).setValue(WeldCount);
        if (WeldCount > 3) {ss.getRange("H"+i).setBackground("#CC0000"); ss.getRange("H"+i).setFontWeight("bold")};
        if (WeldCount == 3) {ss.getRange("H"+i).setBackground("#00CC00"); ss.getRange("H"+i).setFontWeight("bold")};
      break;
    }

    TotalCount--;
    ss.getRange("M"+i).setValue(TotalCount);

}

}
//ss.getRange("A2").setValue("Final Counts:");
//ss.getRange("M2").setValue("New Total: "+TotalCount);
//ss.getRange("J2").setValue("YA: "+YaCount);
//ss.getRange("I2").setValue("Teen: "+TeenCount);
//ss.getRange("K2").setValue("Male: "+MaleCount);
//ss.getRange("L2").setValue("Female: "+FemaleCount);
//ss.getRange("B2").setValue("Mautz: "+MautzCount);
//ss.getRange("C2").setValue("Moses: "+MosesCount);
//ss.getRange("D2").setValue("Adams: "+AdamsCount);
//ss.getRange("E2").setValue("Sullivan: "+SullivanCount);
//ss.getRange("F2").setValue("Baldwin: "+BaldwinCount);
//ss.getRange("G2").setValue("Bingham: "+BinghamCount);
}