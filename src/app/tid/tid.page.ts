import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tid',
  templateUrl: 'tid.page.html',
  styleUrls: ['tid.page.scss'],
})
export class TidPage {
  ClearCredit:any;
  LocalClearCredit:any;
  krn:any;
  TID1:any;
  TID2:any;
  MeterNumber:any;
  constructor(public httpClient: HttpClient,private barcodeScanner: BarcodeScanner)
  {
  }

  KrnChange()
  {
    console.log("Krn Change Clicked");
    this.ChangeKRN(this.MeterNumber)
  }


  doSomething(MeterNumber)
  {
    //console.log(MeterNumber);
    //var m = MeterNumber;
    console.log(MeterNumber.toString().length);
    
    if(MeterNumber.length==11 || MeterNumber.length==13)
    {
      console.log("in DoSomething : "+MeterNumber.length);
      this.GetMeterInfo(MeterNumber);
      this.MeterNumber=MeterNumber;
    }
  }

  ChangeKRN(MeterNum)
  {
    try
    {
      console.log("GetMeterInfo");
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/TidKrnChange?MeterNumber="+MeterNum+"");
      this.ClearCredit.subscribe((data) => 
      {
        this.LocalClearCredit = Object.values(data);
        var stringifiedData = JSON.stringify(data);
        var parsedData = JSON.parse(stringifiedData);

        if(parsedData == "Success")
        {
          this.GetMeterInfo(MeterNum)
        }
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  GetMeterInfo(MeterNum)
  {
    try
    {
      console.log("GetMeterInfo");
      this.ClearCredit = this.httpClient.get("http://services.webvend.co.za/MobileAppService/api/TidMeterInfo?MeterNumber="+MeterNum+"");
      this.ClearCredit.subscribe((data) => 
      {
        this.LocalClearCredit = Object.values(data);
        var stringifiedData = JSON.stringify(data);
        var parsedData = JSON.parse(stringifiedData);

        var qp = []
        for (var i of parsedData)
        {
          //qp.push(i.quantity_produced);
          console.log(i);
          console.log(i.meterNumber);
          console.log(i.krn);
          console.log(i.tiD1);
          console.log(i.tiD2);
          this.krn = i.krn;
          var tid1 = i.tiD1;
          var tid2 = i.tiD2;
          this.TID1 = tid1.substring(0,4) + "-" +tid1.substring(4,8) + "-" + tid1.substring(8,12) + "-" + tid1.substring(12,16) + "-" +tid1.substring(16,20);
          this.TID2 = tid2.substring(0,4) + "-" +tid2.substring(4,8) + "-" + tid2.substring(8,12) + "-" + tid2.substring(12,16) + "-" +tid2.substring(16,20);
        }
      });
    }
    catch(e)
    {
      //console.log('Error Clearing Credit : '+e)
    }
  }

  ScanBarcode()
  {
    this.MeterNumber="";
    this.barcodeScanner.scan().then(barcodeData =>
     {
       this.MeterNumber=barcodeData.text;
      console.log('From Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
