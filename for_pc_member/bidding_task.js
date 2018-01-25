var appendStyle = function(style) {
  var css = document.createElement("style");
  css.type = "text/css";
  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);
};

// セッションデータ
// FIXME: schemaを定義してajaxで取得する？
var sessions = $.parseJSON(`
  [
    { "sid": "s22", "name": "DBシステムアーキテクチャ" },
    { "sid": "s23", "name": "HCIと情報マネジメント" },
    { "sid": "s53", "name": "Internet of Humans" },
    { "sid": "s54", "name": "IoT" },
    { "sid": "s26", "name": "SNS" },
    { "sid": "s43", "name": "SNSデータ処理" },
    { "sid": "s6", "name": "Web情報システム" },
    { "sid": "s18", "name": "ウェブ・データマイニング" },
    { "sid": "s48", "name": "クラウドソーシング" },
    { "sid": "s11", "name": "グラフデータ処理" },
    { "sid": "s5", "name": "コンテンツ管理・流通" },
    { "sid": "s21", "name": "ストリームデータ" },
    { "sid": "s1", "name": "ストリームデータマイニング" },
    { "sid": "s36", "name": "ストレージ" },
    { "sid": "s14", "name": "センサネットワークとデータ工学" },
    { "sid": "s51", "name": "ソーシャルメディアにおける地理情報" },
    { "sid": "s35", "name": "テキストデータ処理・テキストデータベース" },
    { "sid": "s50", "name": "テキストマイニング応用" },
    { "sid": "s20", "name": "テキスト処理" },
    { "sid": "s7", "name": "データベースコア技術" },
    { "sid": "s44", "name": "データマイニング" },
    { "sid": "s15", "name": "データ処理" },
    { "sid": "s45", "name": "データ処理の社会応用" },
    { "sid": "s34", "name": "データ構造・インデックス" },
    { "sid": "s33", "name": "トピックモデル・追跡・統計的学習" },
    { "sid": "s12", "name": "ブログ・ソーシャルネットワーク" },
    { "sid": "s42", "name": "プライバシ" },
    { "sid": "s4", "name": "マイクロブログ" },
    { "sid": "s46", "name": "マルチメディア" },
    { "sid": "s3", "name": "レシピ" },
    { "sid": "s32", "name": "交通・人流" },
    { "sid": "s28", "name": "会話・対話コミュニティ質問応答" },
    { "sid": "s30", "name": "分散処理" },
    { "sid": "s52", "name": "動画音楽" },
    { "sid": "s31", "name": "医療情報処理" },
    { "sid": "s8", "name": "可視化" },
    { "sid": "s19", "name": "問い合わせ処理" },
    { "sid": "s47", "name": "地理情報と分析" },
    { "sid": "s37", "name": "応用データ処理" },
    { "sid": "s2", "name": "情報推薦" },
    { "sid": "s25", "name": "情報検索" },
    { "sid": "s55", "name": "情報要約・抽出" },
    { "sid": "s49", "name": "教育とデータ工学" },
    { "sid": "s39", "name": "時系列データ処理" },
    { "sid": "s16", "name": "機械学習" },
    { "sid": "s17", "name": "深層学習" },
    { "sid": "s38", "name": "災害" },
    { "sid": "s24", "name": "画像・マルチメディア" },
    { "sid": "s41", "name": "画像・空間情報" },
    { "sid": "s10", "name": "移動・行動" },
    { "sid": "s27", "name": "空間・時空間データベース" },
    { "sid": "s40", "name": "自然言語処理" }
  ]
`);

var styles = `
  [draggable] {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    /* Required to make elements draggable in old WebKit */
    -khtml-user-drag: element;
    -webkit-user-drag: element;
  }

  .page {
    margin: 30px;
  }

  .content {
    padding-left: 20px;
    padding-right: 20px;
  }

  section {
    margin-top: 20px;
  }

  .sessions.section {
    margin-top: 30px;
  }

  .question.header {
    margin-bottom: 20px;
  }

  .ui.session.label {
    margin-top: 6px;
    margin-right: 6px;
    cursor:pointer;
  }

  .ui.rank.label {
    background-color: #FFFFFF !important;
  }

  .rank {
    padding-right: 6px;
  }

  .hovering {
    background-color: #D3DEF1 !important;
  }

  .answering.section {
    margin-top: 10px;
  }
`;

var getValueFromInput = function(name) {
  var text = $(`input[name='${name}']`).val();
  return $("<div />")
    .text(text)
    .html();
};

var renderSessionLabels = function(sessions) {
  return sessions
    .map(function(session) {
      return `
      <div class="ui session label draggable" id="${session.sid}" draggable="true">
        ${session.name}
      </div>
    `;
    })
    .join("");
};

var renderSessionPools = function(poolsNum) {
  var pools = [];
  for (var i = 1; i <= poolsNum; i++) {
    pools.push(i);
  }
  return pools
    .map(function(id) {
      return `
    <div id="${id}" class="ui segment session-frame dropzone related-session">
      <div class="ui label rank">${id}</div>
    </div>
    `;
    })
    .join("");
};

var renderApp = function(sessions) {
  var $sessionLabels = renderSessionLabels(sessions);
  var $sessionPools = renderSessionPools(5);

  var $title = getValueFromInput("t_title");
  var $authors = getValueFromInput("t_authors");
  var $abstract = getValueFromInput("t_abstract");
  var $keywords = getValueFromInput("t_keywords");

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
              セッションリストの中から発表投稿に関連するセッションを、関連度の高いものから順にドラッグ&ドロップで入れてください。</br>
              <b>
                できるだけ5つ全ての欄にセッションを入れてください．どうしても入れられない場合のみ空欄にして「回答する」を押してください．
              </b>
            </p>
          </div>
          <div class="sessions section">
            <div class="ui stackable grid">

              <div id="related-session-pool" class="six wide column">
                <h3 class="ui dividing header">
                  発表投稿に関連するセッション
                </h3>
                ${$sessionPools}
              </div>

              <div class="ten wide column">
                <h3 class="ui dividing header">
                  セッションリスト
                </h3>
                <div id="default" class="ui segment session-frame dropzone">
                  ${$sessionLabels}
                </div>
                <p>
                  セッションリストで選択していないセッションになる場合があります。</br>
                  また、産学連携セッションでの発表を希望されない場合は投稿ページのコメント欄にその旨を記載下さい。
                </p>
              </div>

            </div>
          </div>

          <div class="answering section">
            <button class="ui green button js-answer-button">回答する</button>
          </div>
        </section>
      </div>
    </div>
  `);

  return $task;
};

var clickedAnswerButton = function(event) {
  var $submission_id = getValueFromInput("t_submission_id");
  var $title = getValueFromInput("t_title");

  var sessions = event.data;

  var getSessionLabelFromPools = $(`#related-session-pool`)
    .find(".session.label")
    .get();
  if (getSessionLabelFromPools.length === 0) {
    alert("1つ以上「発表投稿に関連するセッション」にセッションを入れてください。");
    return;
  }

  var getSessionsFromPools = $(`#related-session-pool`)
    .children(".related-session")
    .get();

  var relatedSessions = getSessionsFromPools.map(function(elm) {
    var rank = $(elm).attr("id");
    var sid = "";

    var label = $(elm)
      .children(".session.label")
      .get();
    if (label.length === 1) {
      sid = $(label[0]).attr("id");
    }
    return {
      rank: rank,
      sid: sid,
    };
  });
  var stringifySessions = JSON.stringify(relatedSessions);

  var $uid = localStorage.user;
  if (!$uid) {
    $uid = randomstr();
    localStorage.user = $uid;
  }

  var $store = $("[name=store]")[0];
  var tasks = {
    // !!本番ではコメントアウトを取る!!
    tid: $store._FACT1___tid.value,
    uid: $uid,
    submission_id: $submission_id,
    title: $title,
    sessions: stringifySessions,
  };

  $($store.tid).val(tasks.tid);
  $($store.sessions).val(tasks.sessions);
  $($store.uid).val(tasks.uid);
  $($store.title).val(tasks.title);
  $($store.submission_id).val(tasks.submission_id);
  $($store).submit();
};

$(function() {
  appendStyle(styles);

  $("header").remove();
  var $app = $("#app-root");
  $app.append(renderApp(sessions));
  $app.find(".js-answer-button").click(sessions, clickedAnswerButton);
});

var randomstr = function(length) {
  var s = "";
  length = length || 32;
  for (var i = 0; i < length; i++) {
    var random = (Math.random() * 16) | 0;
    s += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
  }
  return s;
};

$(document).ready(function() {
  var dragging = null;

  $(`.draggable`)
    .on("dragstart", function(e) {
      dragging = $(this);
    })
    .on("dragend", function(e) {
      dragging = null;
    });

  var getDropZone = function(dragging, target) {
    if (!dragging || !target) {
      return null;
    }
    var targetDropzone = null;
    var myDropzone = dragging.parent();
    if (target.hasClass("dropzone")) {
      targetDropzone = target;
    } else if (target.parent().hasClass("dropzone")) {
      targetDropzone = target.parent();
    }
    if (myDropzone.attr("id") === targetDropzone.attr("id")) {
      return null;
    }
    return targetDropzone;
  };

  var innerChild = false;

  $(`.dropzone`)
    .on("dragstart", function(e) {
      e.originalEvent.dataTransfer.setData("text/plain", e.target.id);
    })
    .on("dragenter", function(e) {
      e.preventDefault();
      var dropzone = getDropZone(dragging, $(e.target));
      if (dropzone) {
        dropzone.addClass("hovering");
      }
    })
    .on("dragleave", function(e) {
      $(e.target).removeClass("hovering");
    })
    .on("dragover", function(e) {
      var dropzone = getDropZone(dragging, $(e.target));
      if (dropzone) {
        e.preventDefault();
        return false;
      }
    })
    .on("drop", function(e) {
      e.stopPropagation();
      e.preventDefault();
      var dropzone = getDropZone(dragging, $(e.target));
      if (dropzone) {
        dropzone.removeClass("hovering");
        if (dropzone.attr("id") !== "default") {
          // defaultではない場合かつ何か入っていたら交換する
          var dropped = dropzone.children(".ui.session.label").first();
          if (dropped) {
            dragging.parent().append(dropped);
            dropzone.append(dragging);
            return;
          }
        }
        // それ以外の場合はそのままDropする
        dropzone.append(dragging);
      }
      return false;
    });
});
