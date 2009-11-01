function onActionEvent(actionID, actionType, action) {
	// Overriding because "requiredMissing" errors are hidden so we need to inform user that all fields are required. 
	if (actionType == "showError") {
		alert("We are unable to process your quote until you answer all the questions marked with *");
		return true;
	}
	return false;
}

function postProcessCreate(obj) {
	if (hasStyle(obj, "table")) {
		postProcessTable(obj)
   }	
	if (hasStyle(obj,"title")) {
		$("#actualTitle").html(obj.label);
	}
	if (hasStyle(obj,"progress")) {
		$("#progressbar p").css("width", obj.label);
		$("#progressbar p").attr("title", obj.label);
	}
	if (hasStyle(obj,"money")) {
		processMoney(obj.id);
	}
	if (hasStyle(obj,"tip")) {
	    $("#" + obj.id).unbind("click", clickTip);
	    $("#" + obj.id).bind("click", obj.id, clickTip);
	}
	$('#' + obj.id + '.required .postLabel').html("<img src='images/star.png' title='Required. ' width='16' height='16' />");
}

function postChangeEvent(questionId, newValue) {
	if ($("#" + questionId).hasClass("money")) {
		processMoney(questionId);
	}
}

function processMoney(questionId) {
	var selector = "#" + questionId + " input";
    var value = $(selector).val();
    if (value == "") {
		value = 0;
    }
	value = parseFloat(value).toFixed(2);
	$(selector).val(value);
}

function clickTip(e) {
	var id = e.data;
	var expanded = $("#" + id + "_expanded");
	if (expanded.length > 0) {
 		$(expanded).remove();
 	} else {
 		$("#" + id).next().after("<div id=\"" + id + "_expanded\" class=\"expandedTip\"><p>" + $("#" + id).children(":first").html() + "</p></div>");
 	}
}

function postProcessTable(obj) {
	   var id = obj.id;
	   var tableId = id + "_table";
	   if ($("#" + tableId).length == 0) {
	       var startValue = $("#" + id + " select option:selected").val();
	       var headers = obj.preLabel.split("|");
	       var columnWidth = Math.floor(8 / headers.length);
	       var html = "<div id=\"" + tableId + "\" class=\"span-" + (headers.length * columnWidth + 1) + "\">";
	       html += "<div class=\"row\">";
	       for (var i = 0; i < headers.length; i++) {
	           html += "<span class=\"header span-" + columnWidth + "\">" + headers[i] + "</span>";
	       }
	       html += "<span class=\"header span-1\">select</span>";
	       html += "</div>";
	       var possibleAnswers = obj.possibleAnswers;
	       // note: starts at 1 to skip the null value
	       for (var i=1; i < possibleAnswers.length; i++) {
	           var keyValue = possibleAnswers[i];
	           html += "<div id=\"" + id + "_" + keyValue[0] + "\" class=\"row\">";
	           var values = keyValue[1].split("|");
	           for (var j = 0; j < values.length; j++) {
	               html += "<span class=\"cell span-" + columnWidth + "\">" + values[j].replace(/.000/g, ",000") + "</span>";
	           }
	           html += "<span class=\"cell span-1\"><input type=\"checkbox\" value=\"" + keyValue[0] + "\"/></span>";
	           html += "</div>"
	       }
	       html += "</div>";
	       $("#" + id).append(html);
	       if (startValue != "") { 
	           $("#" + id + "_" + startValue + " input").attr("checked", true);
	              $("#" + id + "_" + startValue).attr("class", "row selected");
	       }
	       $("#" + id + " .row").bind("click", function() {
	           var id = $(this).parent().parent().attr("id"); 
	           var oldValue = $("#" + id + " select option:selected").val();
	           var newValue = $(this).find("input").val();
	           if (oldValue != "") {
	               $("#" + id + "_" + oldValue + " input").attr("checked", false);
	               $("#" + id + "_" + oldValue).attr("class", $("#" + id + "_" + oldValue).attr("class").replace(" selected", ""));
	           }
	           if (newValue == oldValue) {
	               $("#" + id + " select").val("");
	           } else {
	               $("#" + id + "_" + newValue + " input").attr("checked", true);
	               $("#" + id + " select").val(newValue);
	               $(this).attr("class", $(this).attr("class") + " selected");
	           }
	              $("#" + id + " select").change();
	       });
	       $("#" + id + " .row").bind("mouseover", function() {
	           $(this).attr("class", $(this).attr("class") + " hover");
	       });
	       $("#" + id + " .row").bind("mouseout", function() {
	           $(this).attr("class", $(this).attr("class").replace(" hover", ""));
	       });
	   }
	}

