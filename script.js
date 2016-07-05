chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var tab = tabs[0].title;
  document.getElementById("titleText").innerHTML = "Links for: " + tab;
});

chrome.tabs.executeScript(null,{code:"document.getElementsByTagName('a').length;"},function(len){
  for (var i = 0; i < len; i++) {
    chrome.tabs.executeScript(null,{code:"document.getElementsByTagName('a')["+i+"].href;"},function(links){
        var a = document.createElement('a');
        var li = document.createElement('li');
        var linkText = document.createTextNode(links);
        a.appendChild(linkText);
        a.href = links
        li.appendChild(a);
        document.getElementById("list").appendChild(li);
      });
  }
});

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
})
