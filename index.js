function doPost(e) {
    var verificationToken = e.parameter.token;
    if (verificationToken != 'hogehoge') { // AppのVerification Tokenを入れる
       throw new Error('Invalid token');
    }
    var command = e.parameter.text.split(' ');
    var response;
    if (command.length !== 1) {
      response = { text: 'パラメータが不正です'};
      return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
    }
  
    var kind;
    var name =  e.parameter.user_name;
    if (command[0] === 'in') {
      kind = '解錠';
      response = { text: '入館記録をつけました' };
    } else if (command[0] === 'out') {
      kind = '施錠';
      response = { text: '退館記録をつけました' };
    } else {
      response = { text: 'パラメータが不正です'};
      return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);    
    }
    // 現在アクティブなスプレッドシートを取得
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // そのスプレッドシートの最初のシートを取得
    var sheet = ss.getSheets()[0];
  
    // 現在時刻を取得する
    var jikan= new Date();
    var month = jikan.getMonth()+1;
    var date = ('0' + jikan.getDate()).slice(-2);
    var hour = jikan.getHours();
    var minute = ('0' + jikan.getMinutes()).slice(-2);
    var dayOfWeek = jikan.getDay() ;	// 曜日(数値)
    var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;	// 曜日(日本語表記)
    // 最後行の下に行を追加
    sheet.appendRow([month + '月' + date + '日' + '(' + dayOfWeekStr + ') ' + hour + ':' + minute, kind, name, '○', '○', '○']);
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }
  