function onActionEvent(actionID, actionType, action) {
	// Overriding because "requiredMissing" errors are hidden so we need to inform user that all fields are required. 
	if (actionType == "showError") {
		alert("We are unable to process your quote until you answer all the questions marked with *");
		return true;
	}
	return false;
}

function postProcessCreate(obj) {
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
