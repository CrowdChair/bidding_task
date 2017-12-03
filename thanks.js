var appendStyle = function(style) {
  var css = document.createElement("style");
  css.type = "text/css";
  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);
};

var styles = `
  .page {
    margin: 30px;
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
        <h1>ご協力ありがとうございました。ブラウザのタブを閉じて終了してください。</h1>
      </div>
    </div>
  `);

  return $task;
};

$(function() {
  appendStyle(styles);
  $("header").remove();

  var $app = $("#app-root");
  $app.append(renderApp());
});
