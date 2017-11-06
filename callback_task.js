var appendStyle = function(style) {
  var css = document.createElement('style');
  css.type = 'text/css';
  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);
}

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
`;

var renderApp = function() {
  var $task = $(`
    <div class="bidding task page">
      <div class="ui container main">
        <h1>投稿のセッション投票タスク</h1>
        <div class="ui segment">
          <p>ご協力ありがとうございました。続けてタスクを行う場合は以下の「タスクを続ける」ボタンを押してください。</p>
          <p>終了する場合は、ブラウザのタブを閉じて終了してください。</p>
          <div class="answering section">
            <button class="ui green button js-answer-button">タスクを続ける</button>
          </div>
        </div>
      </div>
    </div>
  `);

  return $task;
};

var clickedFunc = function() {
  var $store = $('[name=store]')[0];
  console.log($store);
  $($store).submit();
};

$(function() {
  appendStyle(styles);

  $app = $('#app-root');
  $app.append(renderApp())

  $app.find('.js-answer-button').click(clickedFunc);
});
