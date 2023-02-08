var Typer = {
  // this is the object for the text typing effect
  text: "",
  accessCountimer: null,
  index: 0,
  speed: 2,
  file: "",
  accessCount: 0,
  deniedCount: 0,
  init: function () {
    // this is the function that initializes the text typing effect
    accessCountimer = setInterval(function () {
      Typer.updLstChr();
    }, 500);
    $.get(Typer.file, function (data) {
      Typer.text = data;
      Typer.text = Typer.text.slice(0, Typer.text.length - 1);
    });
  },

  content: function () {
    // this is the function that displays the text typing effect
    return $("#console").html();
  },

  write: function (str) {
    // this is the function that writes the text typing effect
    $("#console").append(str);
    return false;
  },

  addText: function (key) {
    // this is the function that adds the text typing effect
    if (key.keyCode == 18) {
      Typer.accessCount++;

      if (Typer.accessCount >= 3) {
        Typer.makeAccess();
      }
    } else if (key.keyCode == 20) {
      Typer.deniedCount++;

      if (Typer.deniedCount >= 3) {
        Typer.makeDenied();
      }
    } else if (key.keyCode == 27) {
      Typer.hidepop();
    } else if (Typer.text) {
      var cont = Typer.content();
      if (cont.substring(cont.length - 1, cont.length) == "|")
        $("#console").html(
          $("#console")
            .html()
            .substring(0, cont.length - 1)
        );
      if (key.keyCode != 8) {
        Typer.index += Typer.speed;
      } else {
        if (Typer.index > 0) Typer.index -= Typer.speed;
      }
      var text = Typer.text.substring(0, Typer.index);
      var rtn = new RegExp("\n", "g");

      $("#console").html(text.replace(rtn, "<br/>")); // this does the actual typing effect
      window.scrollBy(0, 50);
    }

    if (key.preventDefault && key.keyCode != 122) {
      key.preventDefault();
    }

    if (key.keyCode != 122) {
      // otherway prevent keys default behavior
      key.returnValue = false;
    }
  },

  updLstChr: function () {
    // this is the function that makes the cursor flash
    var cont = this.content();

    if (cont.substring(cont.length - 1, cont.length) == "|")
      $("#console").html(
        $("#console")
          .html()
          .substring(0, cont.length - 1)
      );
    else this.write("|"); // else write it
  },
};

function replaceUrls(text) {
  // this is the function that makes the links clickable
  var http = text.indexOf("http://"); // where the link starts
  var space = text.indexOf(".me ", http); // where the link ends

  if (space != -1) {
    // if there is a link
    var url = text.slice(http, space - 1);
    return text.replace(url, '<a href="' + url + '">' + url + "</a>"); // make the link clickable
  } else {
    return text; // if there is no link just return the text
  }
}

Typer.speed = 3;
Typer.file = "smadi.txt";
Typer.init(); // this starts the text typing effect

var timer = setInterval("t();", 30);
function t() {
  Typer.addText({ keyCode: 123748 }); // 123748 = start typing effect

  if (Typer.index > Typer.text.length) {
    // if the text is finished typing
    clearInterval(timer); // stop the timer
  }
}
