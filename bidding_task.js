var appendStyle = function(style) {
  var css = document.createElement('style');
  css.type = 'text/css';
  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);
}

// セッションデータ
// FIXME: schemaを定義してajaxで取得する？
var sessions = $.parseJSON(`
  [
    {
      "sid": "s22",
      "name": "DBシステムアーキテクチャ"
    },
    {
      "sid": "s23",
      "name": "HCIと情報マネジメント"
    },
    {
      "sid": "s26",
      "name": "SNS"
    },
    {
      "sid": "s43",
      "name": "SNSデータ処理"
    },
    {
      "sid": "s6",
      "name": "Web情報システム"
    },
    {
      "sid": "s18",
      "name": "ウェブ・データマイニング"
    },
    {
      "sid": "s48",
      "name": "クラウドソーシング"
    },
    {
      "sid": "s11",
      "name": "グラフデータ処理"
    },
    {
      "sid": "s5",
      "name": "コンテンツ管理・流通"
    },
    {
      "sid": "s21",
      "name": "ストリームデータ"
    },
    {
      "sid": "s1",
      "name": "ストリームデータマイニング"
    },
    {
      "sid": "s36",
      "name": "ストレージ"
    },
    {
      "sid": "s14",
      "name": "センサネットワークとデータ工学"
    },
    {
      "sid": "s51",
      "name": "ソーシャルメディアにおける地理情報"
    },
    {
      "sid": "s35",
      "name": "テキストデータ処理・テキストデータベース"
    },
    {
      "sid": "s50",
      "name": "テキストマイニング応用"
    },
    {
      "sid": "s20",
      "name": "テキスト処理"
    },
    {
      "sid": "s7",
      "name": "データベースコア技術"
    },
    {
      "sid": "s44",
      "name": "データマイニング"
    },
    {
      "sid": "s15",
      "name": "データ処理"
    },
    {
      "sid": "s45",
      "name": "データ処理の社会応用"
    },
    {
      "sid": "s34",
      "name": "データ構造・インデックス"
    },
    {
      "sid": "s33",
      "name": "トピックモデル・追跡・統計的学習"
    },
    {
      "sid": "s12",
      "name": "ブログ・ソーシャルネットワーク"
    },
    {
      "sid": "s42",
      "name": "プライバシ"
    },
    {
      "sid": "s4",
      "name": "マイクロブログ"
    },
    {
      "sid": "s46",
      "name": "マルチメディア"
    },
    {
      "sid": "s3",
      "name": "レシピ"
    },
    {
      "sid": "s32",
      "name": "交通・人流"
    },
    {
      "sid": "s28",
      "name": "会話・対話コミュニティ質問応答"
    },
    {
      "sid": "s30",
      "name": "分散処理"
    },
    {
      "sid": "s52",
      "name": "動画音楽"
    },
    {
      "sid": "s31",
      "name": "医療情報処理"
    },
    {
      "sid": "s8",
      "name": "可視化"
    },
    {
      "sid": "s19",
      "name": "問い合わせ処理"
    },
    {
      "sid": "s47",
      "name": "地理情報と分析"
    },
    {
      "sid": "s37",
      "name": "応用データ処理"
    },
    {
      "sid": "s2",
      "name": "情報推薦"
    },
    {
      "sid": "s25",
      "name": "情報検索"
    },
    {
      "sid": "s49",
      "name": "教育とデータ工学"
    },
    {
      "sid": "s39",
      "name": "時系列データ処理"
    },
    {
      "sid": "s16",
      "name": "機械学習"
    },
    {
      "sid": "s17",
      "name": "深層学習"
    },
    {
      "sid": "s38",
      "name": "災害"
    },
    {
      "sid": "s24",
      "name": "画像・マルチメディア"
    },
    {
      "sid": "s41",
      "name": "画像・空間情報"
    },
    {
      "sid": "s10",
      "name": "移動・行動"
    },
    {
      "sid": "s27",
      "name": "空間・時空間データベース"
    },
    {
      "sid": "s40",
      "name": "自然言語処理"
    },
    {
      "sid": "s29",
      "name": "言語処理・情報検索"
    }
  ]
`);

var styles = `
  .page {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .content {
    padding-left: 20px;
    padding-right: 20px;
  }

  .section {
    margin-top: 20px;
  }
  
  .scroolable {
    overflow-y: scroll;
  }
  
  .scroolable.table {
    height: 40vh;
  }
`;

var renderTableBody = function(sessions) {
  return sessions.map(function(session){
    return `
      <tr>
        <td>${session.name}</td>
        <td><input type="radio" value="3" name="${session.sid}" /></td>
        <td><input type="radio" value="2" name="${session.sid}" /></td>
        <td><input type="radio" value="0" name="${session.sid}" checked /></td>
      </tr>
    `
  }).join("");
}

var renderApp = function(sessions) {
  var table_body = renderTableBody(sessions);

  var getValueFromInput = function(name) {
    return $(`input[name='${name}']`).val();
  };

  var $title    = getValueFromInput('title');
  var $authors  = getValueFromInput('authors');
  var $abstract = getValueFromInput('abstract');
  var $keywords = getValueFromInput('keywords');

  var $task = $(`
    <div class="bidding task page">
      <div class="ui container main">
        <h1>投稿のセッション投票タスク</h1>
        <div class="question header">
          <p>以下の投稿内容を読み、設問に答えてください</p>
        </div>
        <div class="ui segment">
          <div class="ui top attached label">投稿内容</div>
          <div class="content">
            <table class="ui table">
              <tbody>
                <tr>
                  <td class="collapsing">タイトル</td>
                  <td>${$title}</td>
                </tr>
                <tr>
                  <td class="collapsing">概要</td>
                  <td>${$abstract}</td>
                </tr>
                <tr>
                  <td class="collapsing">キーワード</td>
                  <td>${$keywords}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <section class="question">
          <h2>設問</h2>
          <div class="question header">
            <p>
              上記の投稿が発表可能なセッションを以下の選択肢から<b>1つ以上、できるだけ多く</b>選択してください。選択肢は全部で50個あります。
            </p>
          </div>
          <div class="sessions section">
            <div class="scroolable table">
              <table class="ui celled unstackable center aligned four column table">
                <thead>
                  <tr>
                    <th>セッション名</th>
                    <th>このセッションで<br/>発表が望ましい</th>
                    <th>このセッションで<br/>発表できる</th>
                    <th>未回答</th>
                  </tr>
                </thead>
                <tbody>
                  ${table_body}
                </tbody>
              </table>
            </div>
          </div>

          <div class="answering section">
            <button class="ui green button js-answer-button">回答する</button>
            <a href="./BiddingTask"><button class="ui button js-skip-button">スキップする</button></a>
          </div>
        </section>
      </div>
    </div>
  `);

  return $task;
};

var clickedAnswerButton = function(event) {
  var sessions = event.data;
  var csv = sessions.map(function(session) {
    return {
      sid: session.sid,
      name: session.name,
      value: $(`input[name='${session.sid}']:checked`).val()
    };
  }).filter(function(session) {
    return session.value !== '0' && session.value !== undefined;
  }).map(function(session) {
    return session.sid + "," + session.value;
  }).join("\n");

  if(csv === "") {
    alert("1つ以上「このセッションで発表が望ましい」もしくは「このセッションで発表できる」にチェックを入れてください。");
    return;
  };

  var $store = $('[name=store]')[0];
  var tasks = {
    tid: $store._FACT1___tid.value,
    submission_id: $store._FACT1___submission_id.value,
    sessions: csv
  };

  console.log($store);
  console.log(tasks);

  $($store.tid).val(tasks.tid);
  $($store.submission_id).val(tasks.submission_id);
  $($store.sessions).val(tasks.sessions);
  $($store).submit();
};

$(function() {
  appendStyle(styles);

  $app = $('#app-root');
  $app.append(renderApp(sessions))
  $app.find('.js-answer-button').click(sessions, clickedAnswerButton);
});
