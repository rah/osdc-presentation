<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%@ include file="/jsps/include.jspf" %>
<link rel="stylesheet" type="text/css" media="screen" href="css/reset.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/typography.css" />
<link rel="stylesheet" type="text/css" media="screen" href="css/layout.css">
<link rel="stylesheet" type="text/css" media="screen" href="css/style.css">
<script type="text/javascript" src="script/extra.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    onQuestionnaireLoad("bodyContent", "presentation");
  });
</script>
<title>OSDC Tohu Presentation</title>
</head>
<body>
<div id="container">
  <div id="header" class="centeredImage">
<!--   <h1 class="floatRight">Tohu</h1>-->
   <img src="images/tohu-banner_r2v1.png" width="930" title="Presentation"  />
  </div>
  <div id="wrapper">

        <div id="bodyContent" class="innerPadding"></div>

		<form>
			<input type="button" value="Reset" onclick="resetDrools()" />
		</form>
    	<a href="nostyles.jsp">Without CSS</a> </div>
  <div id="rightSideBar">
    <div class="innerPadding"> 
    <h3 id="actualTitle">&nbsp;</h3>
<!--    <img src="images/drools-logo.png" height="100" width="200" id="side-logo">-->
    <img src="images/tohu_logo_200px.gif" id="side-logo">
        <div id="progressindicator" class="clearfix">
        	&nbsp;
        	<h3>Your Progress:</h3>
          	<div id="progressbar">
            	<p>&nbsp;</p>
          	</div>
        </div>
      
      <div id="helphint">
        <p>Click the help buttons for assistance with a question</p>
      </div>
    </div>
  </div>
</div>
</body>
</html>
