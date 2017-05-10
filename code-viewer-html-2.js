/*
 *	In The Name Of God
 *	javaSnake Official WebSite
 *	File: code-viewer.js
 *	By  : SMRSAN
 */
S(function(){
	
	S(".javasnake-code-box-html-2 > pre").each(function(){
		
		var cv     = this,
			lines  = cv.innerHTML.split(/\n/),
			result = "",
			lang   = "html", //Specifyes That Wich Language Is Calculating
			html_commentML  = false,
			html_quote      = false,
			html_dquote     = false,
			html_tag        = false,
			html_before_css = false,
			html_before_js  = false,
			html_tagStyle   = "color: #f0a", //Tags Color
			html_commStyle  = "color: #999", //Comments Color
			html_attrStyle  = "color: #f80", //Attributes Color
			html_valueStyle = "color: #b0d", //Value Of Attributes Color
			html_qteStyle   = "color: #090", //Qoutes Color
			html_dqteStyle  = "color: #00f"; //Double Quotes Color
		
		//JS Variables Group
		var js_commentL  = false,
			js_commentML = false,
			js_quote     = false,
			js_dquote    = false,
			js_opStyle   = "color: #d0d", //Operators Color
			js_qteStyle  = "color: #0c0", //js_quotes Color
			js_dqteStyle = "color: #00f", //Double js_quotes Color
			js_brckStyle = "color: #e90", //Brackets Color
			js_commStyle = "color: #999", //Comments Color
			js_keywStyle = "color: #05f", //KeyWords Color
			js_regStyle  = "color: #90d"; //RegExps Color
		
		//CSS Variables Group
		var css_commentML = false,
			css_brackets  = false,
			css_quote     = false,
			css_dquote    = false,
			css_propBool  = false,
			css_addSign   = false,
			css_slctStyle = "color: #77f",//Selectors Color
			css_commStyle = "color: #999",//Comments  Color
			css_brckStyle = "color: #fc0",//css_brackets  Color
			css_qteStyle  = "color: #bb0",//css_quotes    Color
			css_dqteStyle = "color: #0b0",//Double css_quotes Color
			css_propStyle = "color: #d0d",//Porperties Color
			css_addStyle  = "color: #f55",//css_addSign   Color
			css_opStyle   = "color: #0cf",//Operators Color
			css_impStyle  = "color: #f55";// !importants Color
		
		for(var i=0; i<lines.length; i++){// For Each Line
			
			commentL = false;
			
			var ln = lines[i];
			
			for(var j=0; j<ln.length; j++){// For Each Character
				
				switch(lang){
					//HTML
					case 'html':
						
						switch(ln[j]){
							
							case '&':
								
								if(ln[j+1] == 'l' &&
									ln[j+2] == 't' &&
									ln[j+3] == ';'){
									
									if(ln[j+4] == '!'&&
										ln[j+5] == '-'&&
										ln[j+6] == '-'){//HTML COMMENT
										
										if(!html_commentML && !html_quote && !html_dquote){
											
											result += "<span style='" + html_commStyle + "' >&lt;!--";
											html_commentML = true;
											j += 6;
											
										} else {
											
											result += ln[j];
											
										}
										
									} else {
										
										if(!html_commentML && !html_quote && !html_dquote){
											
											if(ln[j+4] != '/'){
											
												result += "&lt;";
												j += 3;
												
												html_tag = true;//Tag Starts Here
												
												var charsTemp = new String();
												
												for(var k=j+1; k<ln.length; k++){
													
													if(ln[k].search(/\W/) == -1){//Not Sign
														
														charsTemp += ln[k];
														
													} else if( ln[k] == ':' || ln[k] == '_' ){
														
														charsTemp += ln[k];
														
													} else {
														
														break;
														
													}
													
												}
												
												if(charsTemp.toLowerCase() == 'script'){
													
													html_before_js = true;
													
												} else if(charsTemp.toLowerCase() == 'style'){
													
													html_before_css = true;
													
												}
												
												result += "<span style='" + html_tagStyle + "' >" + charsTemp + "</span>";
												//ATTRIBUTES COLOR
												result += "<span style='" + html_attrStyle + "' >";
												j += charsTemp.length;
												
											} else {
												
												result += "&lt;/";
												
												j += 3;
												
												var charsTemp = "";
												
												for(var k=j+2; k<ln.length; k++){
													
													if(ln[k] != '>'){
														
														if(ln[k].search(/\W/) != -1 && (ln[k] == ':' || ln[k] == '_')){
															
															charsTemp += ln[k];
															
														} else if(ln[k].search(/\W/) == -1){//Not A Sign
															
															charsTemp += ln[k];
															
														} else {
															
															break;
															
														}
														
													} else {
														
														break;
														
													}
													
												}
												
												result += "<span style='" + html_tagStyle + "' >" + charsTemp + "</span>";
												j += charsTemp.length + 1;
														
											}
											
										} else {
											
											result += ln[j];
											
										}
										
									}
									
								} else if(ln[j+1] == 'g' &&
									ln[j+2] == 't' &&
									ln[j+3] == ';'){
									
									j += 3;
									
									if(!html_commentML && !html_quote && !html_dquote){
										
										html_tag = false;
										
										//Detect If Script Or Style Is Starting
										if(html_before_css){
											
											html_before_css = false;
											lang = "css";
											result += "</span>&gt;<span style='" + css_slctStyle + "' >";
											
										} else if(html_before_js){
											
											html_before_js = false;
											lang = "js";
											result += "</span>&gt;";
											
										} else {
											
											result += "</span>&gt;";
											
										}
										
										
									} else {
										
										result += "&gt;";
										
									}
									
								}
								
							break;
							case '<':
								
								if(!html_commentML && !html_quote && !html_dquote && !html_tag){
									
									if(ln[k+1] != '/'){
										
										result += "&lt;";
										
										html_tag = true;//Tag Starts Here
										
										var charsTamp = "";
										
										for(var k=j+1; k<ln.length; k++){
											
											if(ln[k].search(/\w/) != -1 && (ln[k] == ':' || ln[k] == '_')){
												
												charsTemp += ln[k];
												
											} else if(ln[k].search(/\w/) == -1){//Not A Sign
												
												charsTemp += ln[k];
												
											} else {
												
												break;
												
											}
											
										}
										
										if(charsTemp.toLowerCase() == 'script'){
											
											html_before_js = true;
											
										} else if(charsTemp.toLowerCase() == 'style'){
											
											html_before_css = true;
											
										}
										
										result += "&lt;<span style='" + html_tagStyle + "' >" + charsTemp + "</span>";
										//ATTRIBUTES COLOR
										result += "<span style='" + html_attrStyle + "' >";
										j += charsTemp.length;
										
									} else {
										
										result += "&lt;/";
										
										var charsTemp = "";
										
										for(var k=j+2; k<ln.length; k++){
											
											if(ln[k] != '>'){
												
												if(ln[k].search(/\w/) != -1 && (ln[k] == ':' || ln[k] == '_')){
													
													charsTemp += ln[k];
													
												} else if(ln[k].search(/\w/) == -1){//Not A Sign
													
													charsTemp += ln[k];
													
												} else {
													
													break;
													
												}
												
											} else {
												
												break;
												
											}
											
										}
										
										result += "<span style='" + html_tagStyle + "' >" + charsTemp + "</span>";
										j += charsTemp.length + 1;
										
									}
									
								} else {
									
									result += ln[j];
									
								}
								
							break;
							case '>':
								
								if(!html_commentML && !html_quote && !html_dquote && html_tag){
									
									html_tag = false;
										
									//Detect If Script Or Style Is Starting
									if(html_before_css){
										
										html_before_css = false;
										lang = "css";
										result += "</span>&gt;<span style='" + css_slctStyle + "' >";
										
									} else if(html_before_js){
										
										html_before_js = false;
										lang = "js";
										result += "</span>&gt;";
										
									} else {
										
										result += "</span>&gt;";
										
									}
									
								} else {
									
									result += "&gt;";
									
								}
								
							break;
							case '-':
								
								if(html_commentML){
									
									if(ln[j+1] == '-' &&
										ln[j+2] == '&' &&
										ln[j+3] == 'g' &&
										ln[j+4] == 't' &&
										ln[j+5] == ';'){//HTML COMMENT END
										
										html_commentML = false;
										result += "--&gt;</span>";
										j += 5;
										
									} else {
									
										result += ln[j];
									
									}
									
								} else {
									
									result += ln[j];
									
								}
								
							break;
							case '=':
								
								if(!html_commentML && !html_quote && !html_dquote && html_tag){
									
									result += "</span>=";
									
									var quotyFlag = false;
									
									for(var k=j+1; k<ln.length; k++){
										
										if(ln[k] != ' ' && ln[k] != '	'){
											
											if(ln[k] == '"' || ln[k] == "'"){
												
												quotyFlag = true;
												
											} else {
												
												break;
												
											}
											
										}
										
									}
									
									if(!quotyFlag){//IF VALUES ARE NOT BETWEEN QUOTES
										
										var charsTemp = "",
											firstSpaceTemp = true;
										
										for(var k=j+1; k<ln.length; k++){
											
											if((ln[k] == ' ' || ln[k] == '	')){
												
												if(firstSpaceTemp){
													
													charsTemp += ln[k];
													
												} else {
													
													break;
													
												}
												
											} else {
												
												firstSpaceTemp = false;
												charsTemp += ln[k];
												
											}
											
										}
										
										result += "<span style='" + html_valueStyle + "' >" + charsTemp + "</span>";
										result += "<span style='" + html_attrStyle + "' >";
										
										j += charsTemp.length;
										
									}
									
								} else {
									
									result += ln[j];
									
								}
								
							break;
							case '"':
								
								if(!html_commentML && !html_quote && html_tag){
									
									if(!html_dquote){//START OF DQUOTES
										
										html_dquote = true;
										result += '<span style="' + html_dqteStyle + '" >"';
										
									} else {//END OF DQUOTES
										
										if(ln[j-1] != '\\' || (ln[j-1] == '\\' && ln[j-2] == '\\')){
											
											result += '"</span><span style="' + html_attrStyle + '" >';
											html_dquote = false;
											
										} else {
											
											result += ln[j];
											
										}
										
									}
									
								} else {
									
									result += ln[j];
									
								}
								
							break;
							case "'":
								
								if(!html_commentML && !html_dquote && html_tag){
									
									if(!html_quote){//START OF QUOTES
										
										html_quote = true;
										result += "<span style='" + html_qteStyle + "' >'";
										
									} else {//END OF QUOTES
										
										if(ln[j-1] != '\\' || (ln[j-1] == '\\' && ln[j-2] == '\\')){
											
											result += "'</span><span style='" + html_attrStyle + "' >";
											html_quote = false;
											
										} else {
											
											result += ln[j];
											
										}
										
									}
									
								} else {
									
									result += ln[j];
									
								}
								
							break;
							case '/':
								
								if(!html_commentML && !html_dquote && !html_quote && html_tag){
									
									if(ln[j+1] == '&'&&
										ln[j+2] == 'g' &&
										ln[j+3] == 't' &&
										ln[j+4] == ';'){
										
										result += "</span>/";
										
									} else {
										
										result += ln[j];
										
									}
									
								} else {
									
									result += ln[j];
									
								}
								
							break;
							case ' ':
								
								result += "&nbsp;";
								
							break;
							case '	':
								
								result += "&nbsp;&nbsp;&nbsp;&nbsp;";
								
							break;
							default:
								
								result += ln[j];
								
							break;
							
						}
						
					break;//END OF HTML
					//JAVASCRIPT
					case 'js':
						
						switch(ln[j]){//JS Calculation
							
							case '<':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									//JAVASCRIPT END IF
									if(ln[j+1] == '/' &&
										ln[j+2] == 's' &&
										ln[j+3] == 'c' &&
										ln[j+4] == 'r' &&
										ln[j+5] == 'i' &&
										ln[j+6] == 'p' &&
										ln[j+7] == 't'){
										
										result += "&lt;/<span style='" + html_tagStyle + "' >script</span>";
										
										num = 7;
										lang = 'html';
										
									} else {
										
										result += "<span style='" + js_opStyle + "' >&lt;</span>";
										
									}
									
								} else { result += "&lt;" }
								
							break;
							case '>':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >&gt;</span>";
									
								} else { result += "&gt;" }
								
							break;
							case '&':
								
								var num = 0;
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									if(ln[j+1] == 'l' && ln[j+2] == 't' && ln[j+3] == ';'){
										
										num = 3;
										
										//JAVASCRIPT END IF
										if(ln[j+4] == '/' &&
											ln[j+5] == 's' &&
											ln[j+6] == 'c' &&
											ln[j+7] == 'r' &&
											ln[j+8] == 'i' &&
											ln[j+9] == 'p' &&
											ln[j+10] == 't'){
											
											result += "&lt;/<span style='" + html_tagStyle + "' >script</span>";
											
											num = 10;
											lang = 'html';
											
										} else {
											
											result += "<span style='" + js_opStyle + "' >&lt;</span>";
											
										}
										
									} else if(ln[j+1] == 'g' && ln[j+2] == 't'){
										
										num = 3;
										
										result += "<span style='" + js_opStyle + "' >&gt;</span>";
										
									} else {
										
										num = 4;
										
										result += "<span style='" + js_opStyle + "' >&amp;</span>";
										
									}
									
								} else { //Without Any Color
									
									if(ln[j+1] == 'l' && ln[j+2] == 't'){
										
										num = 3;
										
										result += "&lt;";
										
									} else if(ln[j+1] == 'g' && ln[j+2] == 't'){
										
										num = 3;
										
										result += "&gt;";
										
									} else {
										
										num = 4;
										
										result += "&amp;";
										
									}
									
								}
								
								j += num;
								
							break;
							case '(':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_brckStyle + "' >(</span>";
									
								} else { result += "(" }
								
							break;
							case ')':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_brckStyle + "' >)</span>";
									
								} else { result += ")" }
								
							break;
							case '{':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_brckStyle + "' >{</span>";
									
								} else { result += "{" }
								
							break;
							case '}':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_brckStyle + "' >}</span>";
									
								} else { result += "}" }
								
							break;
							case '[':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_brckStyle + "' >[</span>";
									
								} else { result += "[" }
								
							break;
							case ']':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_brckStyle + "' >]</span>";
									
								} else { result += "]" }
								
							break;
							case ',':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >,</span>";
									
								} else { result += "," }
								
							break;
							case '.':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >.</span>";
									
								} else { result += "." }
								
							break;
							case '|':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >|</span>";
									
								} else { result += "|" }
								
							break;
							case "?":
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >?</span>";
									
								} else { result += "?" }
								
							break;
							case '!':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >!</span>";
									
								} else { result += "!" }
								
							break;
							case '=':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >=</span>";
									
								} else { result += "=" }
								
							break;
							case '-':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >-</span>";
									
								} else { result += "-" }
								
							break;
							case '+':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >+</span>";
									
								} else { result += "+" }
								
							break;
							case '%':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >%</span>";
									
								} else { result += "%" }
								
							break;
							case '*':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >*</span>";
									
								} else { result += "*" }
								
							break;
							case '/':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									if(ln[j+1] == '/'){
										
										js_commentL = true;
										result  += "<span style='" + js_commStyle + "' >/";
										
									} else if(ln[j+1] == '*'){
										
										js_commentML = true;
										result   += "<span style='" + js_commStyle + "' >/";
										
									} else {
						
										var regFlag  = false,
											regChars = ln[j] + ln[j+1];
						
										for(var k=j+2; k<ln.length; k++){
						
											if(ln[k] != '/'){
												regChars += ln[k];
											} else {
												if(ln[k-1] != '\\'){
													regChars += ln[k];
													regFlag = true;
													break;
												} else {
													regChars += ln[k];
												}
											}
						
										}
						
										if(regFlag){
											result += "<span style='" + js_regStyle + "' >" + regChars + "</span>";
											j += regChars.length-1;
										} else {
											result   += "<span style='" + js_opStyle + "' >/</span>";
										}
										
									}
									
								} else {
									
									if(ln[j-1] == '*' && js_commentML){
										js_commentML = false;
										result += "/</span>";
									}
									else result += "/";
									
								}
								
							break;
							case "'":
								
								if(!js_commentL && !js_commentML && !js_dquote){
									
									if(!js_quote){
										js_quote = true;
										result += "<span style='" + js_qteStyle + "' >'";
									} else {
										//BackSlash Check
										let lastCharNum = 1,
											isSlashFlag = false;
										while(ln[j-lastCharNum] == '\\'){
											
											isSlashFlag = (isSlashFlag)? false:true;
											lastCharNum++;
											
										}
										if(!isSlashFlag){
											js_quote = false;
											result += "'</span>";
										} else {
											result += "'";
										}
									}
									
								} else {
									
									result += "'";
									
								}
								
							break;
							case '"':
								
								if(!js_commentL && !js_commentML && !js_quote){
									
									if(!js_dquote){
										js_dquote = true;
										result += '<span style="' + js_dqteStyle + '" >"';
									} else {
										//BackSlash Check
										let lastCharNum = 1,
											isSlashFlag = false;
										while(ln[j-lastCharNum] == '\\'){
											
											isSlashFlag = (isSlashFlag)? false:true;
											lastCharNum++;
											
										}
										if(!isSlashFlag){
											js_dquote = false;
											result += '"</span>';
										} else {
											result += '"';
										}
									}
									
								} else {
									
									result += '"';
									
								}
								
							break;
							case '^':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >^</span>";
									
								} else { result += "^" }
								
							break;
							case ':':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >:</span>";
									
								} else { result += ":" }
								
							break;
							case ';':
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									result += "<span style='" + js_opStyle + "' >;</span>";
									
								} else { result += ";" }
								
							break;
							case ' ':
							
								result += "&nbsp;";
								
							break;
							case '	':
							
								result += "&nbsp;&nbsp;&nbsp;&nbsp;";
								
							break;
							default:
								
								if(!js_commentL && !js_commentML && !js_quote && !js_dquote){
									
									switch(ln[j]){//KeyWords Switch
										
										case 'a':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'b' &&
												ln[j+2] == 's' &&
												ln[j+3] == 't' &&
												ln[j+4] == 'r' &&
												ln[j+5] == 'a' &&
												ln[j+6] == 'c' &&
												ln[j+7] == 't' &&
												code_keyword(ln[j+8])){//abstract KeyWord
												
												result += "<span style='" + js_keywStyle + "' >abstract</span>";
												
												j += 7;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'b':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'o' &&
												ln[j+2] == 'o' &&
												ln[j+3] == 'l' &&
												ln[j+4] == 'e' &&
												ln[j+5] == 'a' &&
												ln[j+6] == 'n' &&
												code_keyword(ln[j+7])){//boolean KeyWord
												
												result += "<span style='" + js_keywStyle + "' >boolean</span>";
												
												j += 6;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'r' &&
												ln[j+2] == 'e' &&
												ln[j+3] == 'a' &&
												ln[j+4] == 'k' &&
												code_keyword(ln[j+5])){//break KeyWord
												
												result += "<span style='" + js_keywStyle + "' >break</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'y' &&
												ln[j+2] == 't' &&
												ln[j+3] == 'e' &&
												code_keyword(ln[j+4])){//byte KeyWord
												
												result += "<span style='" + js_keywStyle + "' >byte</span>";
												
												j += 3;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'c':
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'a' &&
												ln[j+2] == 's' &&
												ln[j+3] == 'e' &&
												code_keyword(ln[j+4])){//case KeyWord
												
												result += "<span style='" + js_keywStyle + "' >case</span>";
												
												j += 3;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'a' &&
												ln[j+2] == 't' &&
												ln[j+3] == 'c' &&
												ln[j+4] == 'h' &&
												code_keyword(ln[j+5])){//catch KeyWord
												
												result += "<span style='" + js_keywStyle + "' >catch</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'h' &&
												ln[j+2] == 'a' &&
												ln[j+3] == 'r' &&
												code_keyword(ln[j+4])){//char KeyWord
												
												result += "<span style='" + js_keywStyle + "' >char</span>";
												
												j += 3;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'l' &&
												ln[j+2] == 'a' &&
												ln[j+3] == 's' &&
												ln[j+4] == 's' &&
												code_keyword(ln[j+5])){//class KeyWord
												
												result += "<span style='" + js_keywStyle + "' >class</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'o' &&
												ln[j+2] == 'n' &&
												ln[j+3] == 's' &&
												ln[j+4] == 't' &&
												code_keyword(ln[j+5])){//const KeyWord
												
												result += "<span style='" + js_keywStyle + "' >const</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'o' &&
												ln[j+2] == 'n' &&
												ln[j+3] == 't' &&
												ln[j+4] == 'i' &&
												ln[j+5] == 'n' &&
												ln[j+6] == 'u' &&
												ln[j+7] == 'e' &&
												code_keyword(ln[j+8])){//continue KeyWord
												
												result += "<span style='" + js_keywStyle + "' >continue</span>";
												
												j += 7;
												
											} else {
												
												result += ln[j];
												
											}
										break;
										case 'd':
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'e' &&
												ln[j+2] == 'b' &&
												ln[j+3] == 'u' &&
												ln[j+4] == 'g' &&
												ln[j+5] == 'g' &&
												ln[j+6] == 'e' &&
												ln[j+7] == 'r' &&
												code_keyword(ln[j+8])){//debugger KeyWord
												
												result += "<span style='" + js_keywStyle + "' >debugger</span>";
												
												j += 7;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'e' &&
												ln[j+2] == 'f' &&
												ln[j+3] == 'a' &&
												ln[j+4] == 'u' &&
												ln[j+5] == 'l' &&
												ln[j+6] == 't' &&
												code_keyword(ln[j+7])){//default KeyWord
												
												result += "<span style='" + js_keywStyle + "' >default</span>";
												
												j += 6;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'e' &&
												ln[j+2] == 'l' &&
												ln[j+3] == 'e' &&
												ln[j+4] == 't' &&
												ln[j+5] == 'e' &&
												code_keyword(ln[j+6])){//delete KeyWord
						
												
												result += "<span style='" + js_keywStyle + "' >delete</span>";
												
												j += 5;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'o' &&
												code_keyword(ln[j+2])){//do KeyWord
												
												result += "<span style='" + js_keywStyle + "' >do</span>";
												
												j += 1;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'o' &&
												ln[j+2] == 'u' &&
												ln[j+3] == 'b' &&
												ln[j+4] == 'l' &&
												ln[j+5] == 'e' &&
												code_keyword(ln[j+6])){//double KeyWord
												
												result += "<span style='" + js_keywStyle + "' >double</span>";
												
												j += 5;
												
											} else {
												
												result += ln[j];
												
											}
										break;
										case 'e':
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'l' &&
												ln[j+2] == 's' &&
												ln[j+3] == 'e' &&
												code_keyword(ln[j+4])){//else KeyWord
												
												result += "<span style='" + js_keywStyle + "' >else</span>";
												
												j += 3;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'n' &&
												ln[j+2] == 'u' &&
												ln[j+3] == 'm' &&
												code_keyword(ln[j+4])){//enum KeyWord
												
												result += "<span style='" + js_keywStyle + "' >enum</span>";
												
												j += 3;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'x' &&
												ln[j+2] == 'p' &&
												ln[j+3] == 'o' &&
												ln[j+4] == 'r' &&
												ln[j+5] == 't' &&
												code_keyword(ln[j+6])){//export KeyWord
												
												result += "<span style='" + js_keywStyle + "' >export</span>";
												
												j += 5;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'x' &&
												ln[j+2] == 't' &&
												ln[j+3] == 'e' &&
												ln[j+4] == 'n' &&
												ln[j+5] == 'd' &&
												ln[j+6] == 's' &&
												code_keyword(ln[j+7])){//extends KeyWord
												
												result += "<span style='" + js_keywStyle + "' >extends</span>";
												
												j += 6;
												
											} else {
												
												result += ln[j];
												
											}
										break;
										case 'f':
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'a' &&
												ln[j+2] == 'l' &&
												ln[j+3] == 's' &&
												ln[j+4] == 'e' &&
												code_keyword(ln[j+5])){//false KeyWord
												
												result += "<span style='" + js_keywStyle + "' >false</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'i' &&
												ln[j+2] == 'n' &&
												ln[j+3] == 'a' &&
												ln[j+4] == 'l' &&
												code_keyword(ln[j+5])){//final KeyWord
												
												result += "<span style='" + js_keywStyle + "' >false</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'i' &&
												ln[j+2] == 'n' &&
												ln[j+3] == 'a' &&
												ln[j+4] == 'l' &&
												ln[j+5] == 'l' &&
												ln[j+6] == 'y' &&
												code_keyword(ln[j+7])){//finally KeyWord
												
												result += "<span style='" + js_keywStyle + "' >finally</span>";
												
												j += 6;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'l' &&
												ln[j+2] == 'o' &&
												ln[j+3] == 'a' &&
												ln[j+4] == 't' &&
												code_keyword(ln[j+5])){//float KeyWord
												
												result += "<span style='" + js_keywStyle + "' >finally</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'u' &&
												ln[j+2] == 'n' &&
												ln[j+3] == 'c' &&
												ln[j+4] == 't' &&
												ln[j+5] == 'i' &&
												ln[j+6] == 'o' &&
												ln[j+7] == 'n' &&
												code_keyword(ln[j+8])){//function KeyWord
												
												result += "<span style='" + js_keywStyle + "' >function</span>";
												
												j += 7;
												
											} else if( code_keyword(ln[j-1]) &&
													   ln[j+1] == 'o' &&
													   ln[j+2] == 'r' &&
													   code_keyword(ln[j+3])){//for KeyWord
												
												result += "<span style='" + js_keywStyle + "' >for</span>";
												
												j += 2;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'g':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'o' &&
												ln[j+2] == 't' &&
												ln[j+3] == 'o' &&
												code_keyword(ln[j+4])){//goto KeyWord
												
												result += "<span style='" + js_keywStyle + "' >goto</span>";
												
												j += 3;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'i':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'f' &&
												code_keyword(ln[j+2])){//if KeyWord
												
												result += "<span style='" + js_keywStyle + "' >if</span>";
												
												j += 1;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'm' &&
												ln[j+2] == 'p' &&
												ln[j+3] == 'l' &&
												ln[j+4] == 'e' &&
												ln[j+5] == 'm' &&
												ln[j+6] == 'e' &&
												ln[j+7] == 'n' &&
												ln[j+8] == 't' &&
												ln[j+9] == 's' &&
												code_keyword(ln[j+10])){//implements KeyWord
												
												result += "<span style='" + js_keywStyle + "' >implements</span>";
												
												j += 9;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'm' &&
												ln[j+2] == 'p' &&
												ln[j+3] == 'o' &&
												ln[j+4] == 'r' &&
												ln[j+5] == 't' &&
												code_keyword(ln[j+6])){//import KeyWord
												
												result += "<span style='" + js_keywStyle + "' >import</span>";
												
												j += 5;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'n' &&
												code_keyword(ln[j+2])){//in KeyWord
												
												result += "<span style='" + js_keywStyle + "' >in</span>";
												
												j += 1;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'n' &&
												ln[j+2] == 's' &&
												ln[j+3] == 't' &&
												ln[j+4] == 'a' &&
												ln[j+5] == 'n' &&
												ln[j+6] == 'c' &&
												ln[j+7] == 'e' &&
												ln[j+8] == 'o' &&
												ln[j+9] == 'f' &&
												code_keyword(ln[j+10])){//instanceof KeyWord
												
												result += "<span style='" + js_keywStyle + "' >instanceof</span>";
												
												j += 9;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'n' &&
												ln[j+2] == 't' &&
												code_keyword(ln[j+3])){//int KeyWord
												
												result += "<span style='" + js_keywStyle + "' >int</span>";
												
												j += 2;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'n' &&
												ln[j+2] == 't' &&
												ln[j+3] == 'e' &&
												ln[j+4] == 'r' &&
												ln[j+5] == 'f' &&
												ln[j+6] == 'a' &&
												ln[j+7] == 'c' &&
												ln[j+8] == 'e' &&
												code_keyword(ln[j+9])){//interface KeyWord
												
												result += "<span style='" + js_keywStyle + "' >interface</span>";
												
												j += 8;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'l':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'o' &&
												ln[j+2] == 'n' &&
												ln[j+3] == 'g' &&
												code_keyword(ln[j+4])){//long KeyWord
												
												result += "<span style='" + js_keywStyle + "' >long</span>";
												
												j += 3;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'e' &&
												ln[j+2] == 't' &&
												code_keyword(ln[j+3])){//let KeyWord
												
												result += "<span style='" + js_keywStyle + "' >let</span>";
												
												j += 2;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'n':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'a' &&
												ln[j+2] == 't' &&
												ln[j+3] == 'i' &&
												ln[j+4] == 'v' &&
												ln[j+5] == 'e' &&
												code_keyword(ln[j+6])){//native KeyWord
												
												result += "<span style='" + js_keywStyle + "' >native</span>";
												
												j += 5;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'e' &&
												ln[j+2] == 'w' &&
												code_keyword(ln[j+3])){//new KeyWord
												
												result += "<span style='" + js_keywStyle + "' >new</span>";
												
												j += 2;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'u' &&
												ln[j+2] == 'l' &&
												ln[j+3] == 'l' &&
												code_keyword(ln[j+4])){//null KeyWord
												
												result += "<span style='" + js_keywStyle + "' >null</span>";
												
												j += 3;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'p':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'a' &&
												ln[j+2] == 'c' &&
												ln[j+3] == 'k' &&
												ln[j+4] == 'a' &&
												ln[j+5] == 'g' &&
												ln[j+6] == 'e' &&
												code_keyword(ln[j+7])){//package KeyWord
												
												result += "<span style='" + js_keywStyle + "' >package</span>";
												
												j += 6;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'r' &&
												ln[j+2] == 'i' &&
												ln[j+3] == 'v' &&
												ln[j+4] == 'a' &&
												ln[j+5] == 't' &&
												ln[j+6] == 'e' &&
												code_keyword(ln[j+7])){//private KeyWord
												
												result += "<span style='" + js_keywStyle + "' >private</span>";
												
												j += 6;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'r' &&
												ln[j+2] == 'o' &&
												ln[j+3] == 't' &&
												ln[j+4] == 'e' &&
												ln[j+5] == 'c' &&
												ln[j+6] == 't' &&
												ln[j+7] == 'e' &&
												ln[j+8] == 'd' &&
												code_keyword(ln[j+9])){//protected KeyWord
												
												result += "<span style='" + js_keywStyle + "' >protected</span>";
												
												j += 8;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'u' &&
												ln[j+2] == 'b' &&
												ln[j+3] == 'l' &&
												ln[j+4] == 'i' &&
												ln[j+5] == 'c' &&
												code_keyword(ln[j+6])){//public KeyWord
												
												result += "<span style='" + js_keywStyle + "' >public</span>";
												
												j += 5;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'r':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'e' &&
												ln[j+2] == 't' &&
												ln[j+3] == 'u' &&
												ln[j+4] == 'r' &&
												ln[j+5] == 'n' &&
												code_keyword(ln[j+6])){//return KeyWord
												
												result += "<span style='" + js_keywStyle + "' >return</span>";
												
												j += 5;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 's':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'h' &&
												ln[j+2] == 'o' &&
												ln[j+3] == 'r' &&
												ln[j+4] == 't' &&
												code_keyword(ln[j+5])){//short KeyWord
												
												result += "<span style='" + js_keywStyle + "' >short</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 't' &&
												ln[j+2] == 'a' &&
												ln[j+3] == 't' &&
												ln[j+4] == 'i' &&
												ln[j+5] == 'c' &&
												code_keyword(ln[j+6])){//static KeyWord
												
												result += "<span style='" + js_keywStyle + "' >static</span>";
												
												j += 5;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'u' &&
												ln[j+2] == 'p' &&
												ln[j+3] == 'e' &&
												ln[j+4] == 'r' &&
												code_keyword(ln[j+5])){//super KeyWord
												
												result += "<span style='" + js_keywStyle + "' >super</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'w' &&
												ln[j+2] == 'i' &&
												ln[j+3] == 't' &&
												ln[j+4] == 'c' &&
												ln[j+5] == 'h' &&
												code_keyword(ln[j+6])){//switch KeyWord
												
												result += "<span style='" + js_keywStyle + "' >switch</span>";
												
												j += 5;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'y' &&
												ln[j+2] == 'n' &&
												ln[j+3] == 'c' &&
												ln[j+4] == 'h' &&
												ln[j+5] == 'r' &&
												ln[j+6] == 'o' &&
												ln[j+7] == 'n' &&
												ln[j+8] == 'i' &&
												ln[j+9] == 'z' &&
												ln[j+10] == 'e' &&
												ln[j+11] == 'd' &&
												code_keyword(ln[j+12])){//synchronized KeyWord
												
												result += "<span style='" + js_keywStyle + "' >synchronized</span>";
												
												j += 11;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 't':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'h' &&
												ln[j+2] == 'i' &&
												ln[j+3] == 's' &&
												code_keyword(ln[j+4])){//this KeyWord
												
												result += "<span style='" + js_keywStyle + "' >this</span>";
												
												j += 3;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'h' &&
												ln[j+2] == 'r' &&
												ln[j+3] == 'o' &&
												ln[j+4] == 'w' &&
												ln[j+5] == 's' &&
												code_keyword(ln[j+6])){//throws KeyWord
												
												result += "<span style='" + js_keywStyle + "' >throws</span>";
												
												j += 5;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'r' &&
												ln[j+2] == 'a' &&
												ln[j+3] == 'n' &&
												ln[j+4] == 's' &&
												ln[j+5] == 'i' &&
												ln[j+6] == 'e' &&
												ln[j+7] == 'n' &&
												ln[j+8] == 't' &&
												code_keyword(ln[j+9])){//transient KeyWord
												
												result += "<span style='" + js_keywStyle + "' >transient</span>";
												
												j += 8;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'r' &&
												ln[j+2] == 'u' &&
												ln[j+3] == 'e' &&
												code_keyword(ln[j+4])){//true KeyWord
												
												result += "<span style='" + js_keywStyle + "' >true</span>";
												
												j += 3;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'y' &&
												ln[j+2] == 'p' &&
												ln[j+3] == 'e' &&
												ln[j+4] == 'o' &&
												ln[j+5] == 'f' &&
												code_keyword(ln[j+6])){//typeof KeyWord
												
												result += "<span style='" + js_keywStyle + "' >typeof</span>";
												
												j += 5;
												
											} else if( code_keyword(ln[j-1]) &&
													   ln[j+1] == 'r' &&
													   ln[j+2] == 'y' &&
													   code_keyword(ln[j+3])){//try KeyWord
												
												result += "<span style='" + js_keywStyle + "' >try</span>";
												
												j += 2;
												
											} else if( code_keyword(ln[j-1]) &&
													   ln[j+1] == 'h' &&
													   ln[j+2] == 'r' &&
													   ln[j+3] == 'o' &&
													   ln[j+4] == 'w' &&
													   code_keyword(ln[j+5])){//throw KeyWord
												
												result += "<span style='" + js_keywStyle + "' >throw</span>";
												
												j += 4;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'v':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'a' &&
												ln[j+2] == 'r' &&
												code_keyword(ln[j+3])){//var KeyWord
												
												result += "<span style='" + js_keywStyle + "' >var</span>";
												
												j += 2;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'o' &&
												ln[j+2] == 'i' &&
												ln[j+3] == 'd' &&
												code_keyword(ln[j+4])){//void KeyWord
												
												result += "<span style='" + js_keywStyle + "' >void</span>";
												
												j += 3;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'o' &&
												ln[j+2] == 'l' &&
												ln[j+3] == 'a' &&
												ln[j+4] == 't' &&
												ln[j+5] == 'i' &&
												ln[j+6] == 'l' &&
												ln[j+7] == 'e' &&
												code_keyword(ln[j+8])){//volatile KeyWord
												
												result += "<span style='" + js_keywStyle + "' >volatile</span>";
												
												j += 7;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										case 'w':
											
											if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'h' &&
												ln[j+2] == 'i' &&
												ln[j+3] == 'l' &&
												ln[j+4] == 'e' &&
												code_keyword(ln[j+5])){//while KeyWord
												
												result += "<span style='" + js_keywStyle + "' >while</span>";
												
												j += 4;
												
											} else if( code_keyword(ln[j-1]) &&
												ln[j+1] == 'i' &&
												ln[j+2] == 't' &&
												ln[j+3] == 'h' &&
												code_keyword(ln[j+4])){//with KeyWord
												
												result += "<span style='" + js_keywStyle + "' >with</span>";
												
												j += 3;
												
											} else {
												
												result += ln[j];
												
											}
											
										break;
										default:
											
											result += ln[j];
											
										break;
										
									}//End Of KeyWords Switch
									
								} else {
									
									result += ln[j];
									
								}
								
							break;
							
						}
						
					break;//END OF JAVASCRIPT
					//CSS
					case 'css':
						
						switch(ln[j]){//Check Each Char
							
							case '@':
								
								if(!css_commentML && !css_quote && !css_dquote && !css_brackets){
									
									if((ln[j+1].toLowerCase() == 'k' &&
										ln[j+2].toLowerCase() == 'e' &&
										ln[j+3].toLowerCase() == 'y' &&
										ln[j+4].toLowerCase() == 'f' &&
										ln[j+5].toLowerCase() == 'r' &&
										ln[j+6].toLowerCase() == 'a' &&
										ln[j+7].toLowerCase() == 'm' &&
										ln[j+8].toLowerCase() == 'e' &&
										ln[j+9].toLowerCase() == 's')
										||
									   (ln[j+1].toLowerCase() == 'm' &&
										ln[j+2].toLowerCase() == 'e' &&
										ln[j+3].toLowerCase() == 'd' &&
										ln[j+4].toLowerCase() == 'i' &&
										ln[j+5].toLowerCase() == 'a')){//keyframes or media
										
										if(ln[j+1].toLowerCase() == 'm' &&
										   ln[j+2].toLowerCase() == 'e' &&
										   ln[j+3].toLowerCase() == 'd' &&
										   ln[j+4].toLowerCase() == 'i' &&
										   ln[j+5].toLowerCase() == 'a'){//media
											
											css_addSign  = true;
											css_brackets = false;
											result  += "</span><span style='" + css_addStyle + "' >@";
											
											result += ln[j+1] + ln[j+2] + ln[j+3] + ln[j+4] + ln[j+5];
											
											j += 5;
											
										} else {//keyframes
											
											css_addSign  = true;
											css_brackets = false;
											result  += "</span><span style='" + css_addStyle + "' >@";
											
											result += ln[j+1] + ln[j+2] + ln[j+3] + ln[j+4] + ln[j+5] + ln[j+6] + ln[j+7] + ln[j+8] + ln[j+9];
											
											j += 9;
											
										}
										
									} else { //Not media Or keyframes
										
										css_addSign  = false;
										result  += "</span><span style='" + css_slctStyle + "' >@";
										
									}
									
								} else {
									
									result += "@";
									
								}
								
							break;
							case '{':
								
								if(!css_commentML && !css_quote && !css_dquote){
									
									if(!css_addSign){
										
										css_propBool = true;
										css_brackets = true;
										result += "</span><span style='" + css_brckStyle + "' >{</span><span style='" + css_propStyle + "' >";
										
									} else {
										
										css_propBool = false;
										css_brackets = false;
										css_addSign  = false;
										result += "</span><span style='" + css_brckStyle + "' >{</span><span style='" + css_slctStyle + "' >";
										
									}
									
								} else {
									
									result += "{";
									
								}
								
							break;
							case '}':
								
								if(!css_commentML && !css_quote && !css_dquote){
									
									css_brackets = false;
									
									if(css_propBool){ result += "</span>";css_propBool = false; }
									
									result += "</span><span style='" + css_brckStyle + "' >}</span>";
									result += "<span style='" + css_slctStyle + "' >";
									
								} else {
									
									result += "}";
									
								}
								
							break;
							case '/':
								
								if(!css_addSign && !css_quote && !css_dquote){
									
									if(!css_commentML && ln[j+1] == '*'){//Comment Start
										
										css_commentML = true;
										
										if(!css_brackets || (css_brackets && css_propBool)){
											
											result += "</span><span style='" + css_commStyle + "' >/";
											
										} else {
											
											result += "<span style='" + css_commStyle + "' >/";
											
										}
										
									} else if(css_commentML && ln[j-1] == '*'){//Comment End
										
										css_commentML = false;
										
										if(!css_brackets || (css_brackets && css_propBool)){
											
											if(!css_brackets){
												
												result += "/</span><span style='" + css_slctStyle + "' >";
												
											} else {
												
												result += "/</span><span style='" + css_propStyle + "' >";
												
											}
											
										} else {
											
											result += "/</span>";
											
										}
										
									} else {
										
										result += "/";
										
									}
									
								} else {
									
									result += "/";
									
								}
								
							break;
							case "'":
								
								if(!css_commentML && !css_dquote && css_brackets && !css_propBool){
									
									if(!css_quote){//css_quote Start
										
										css_quote = true;
										result += "<span style='" + css_qteStyle + "' >'";
										
									} else {//css_quote End
										
										//BackSlash Check
										let lastCharNum = 1,
											isSlashFlag = false;
										while(ln[j-lastCharNum] == '\\'){
											
											isSlashFlag = (isSlashFlag)? false:true;
											lastCharNum++;
											
										}
										if(!isSlashFlag){
											css_quote = false;
											result += "'</span>";
										} else {
											result += "'";
										}
										
									}
									
								} else {
									
									result += "'";
									
								}
								
							break;
							case '"':
								
								if(!css_commentML && !css_quote && css_brackets && !css_propBool){
									
									if(!css_dquote){//css_quote Start
										
										css_dquote = true;
										result += '<span style="' + css_dqteStyle + '" >"';
										
									} else {//css_quote End
										
										//BackSlash Check
										let lastCharNum = 1,
											isSlashFlag = false;
										while(ln[j-lastCharNum] == '\\'){
											
											isSlashFlag = (isSlashFlag)? false:true;
											lastCharNum++;
											
										}
										if(!isSlashFlag){
											css_dquote = false;
											result += '"</span>';
										} else {
											result += '"';
										}
										
									}
									
								} else {
									
									result += '"';
									
								}
								
							break;
							case ':':
								
								if(!css_commentML && !css_dquote && !css_quote && css_brackets && css_propBool){
									
									css_propBool = false;
									result += "</span><span style='" + css_opStyle + "' >:</span>";
									
								} else {
									
									result += ":";
									
								}
								
							break;
							case ';':
								
								if(!css_commentML && !css_dquote && !css_quote && css_brackets && !css_propBool){//Value Condition
									
									css_propBool = true;
									result += "<span style='" + css_opStyle + "' >;</span><span style='" + css_propStyle + "' >";
									
								} else {
									
									result += ";";
									
								}
								
							break;
							case '!':
								
								if(!css_commentML && !css_dquote && !css_quote && css_brackets && !css_propBool){//Value Condition
									
									if( ln[j+1].toLowerCase() == 'i' &&
										ln[j+2].toLowerCase() == 'm' &&
										ln[j+3].toLowerCase() == 'p' &&
										ln[j+4].toLowerCase() == 'o' &&
										ln[j+5].toLowerCase() == 'r' &&
										ln[j+6].toLowerCase() == 't' &&
										ln[j+7].toLowerCase() == 'a' &&
										ln[j+8].toLowerCase() == 'n' &&
										ln[j+9].toLowerCase() == 't'){
										
										result += "<span style='" + css_impStyle + "' >!" + 
													ln[j+1] + ln[j+2] + ln[j+3] + ln[j+4] + ln[j+5] + ln[j+6] + ln[j+7] + ln[j+8] + ln[j+9] +
													"</span>";
										
										j += 9;
										
									} else {
										
										result += "!";
										
									}
									
								} else {
									
									result += "!";
									
								}
								
							break;
							case '&':
								
								if(ln[j+1] == 'l' && ln[j+2] == 't' && ln[j+3] == ';'){
									
									if(!css_commentML && !css_dquote && !css_quote && !css_brackets && !css_propBool){
										
										if(ln[j+4] == '/' &&
											ln[j+5] == 's' &&
											ln[j+6] == 't' &&
											ln[j+7] == 'y' &&
											ln[j+8] == 'l' &&
											ln[j+9] == 'e'){
											
											result += "</span>&lt;/<span style='" + html_tagStyle + "' >style</span>";
											j += 9;
											lang = 'html';
											
										}
										
									} else {
										result += "&lt;";
										j += 3;
									}
									
								} else if(ln[j+1] == 'a' && ln[j+2] == 'p' && ln[j+3] == 'o' && ln[j+4] == 's' && ln[j+5] == ';'){
									
									result += "&apos;";
									j += 5;
									
								} else if(ln[j+1] == 'q' && ln[j+2] == 'u' && ln[j+3] == 'o' && ln[j+4] == 't' && ln[j+5] == ';'){
									
									result += "&quot;";
									j += 5;
									
								} else {
									
									result += "&amp;";
									
								}
								
							break;
							case '	':
								
								result += "&nbsp;&nbsp;&nbsp;&nbsp;";
								
							break;
							case ' ':
								
								result += "&nbsp;";
								
							break;
							default:
								
								result += ln[j];
								
							break;
							
							
						}
						
					break;//END OF CSS
				}
				
			} //End Of Character Loop
			
			if(js_commentL){
				
				js_commentL = false;
				result += "</span><br/>";
				
			} else result += "<br/>";
			
		} //End Of Lines Loop
		
		var code_viewer_html = S('$new','div');
		
		S(code_viewer_html)
		.attr('class','javasnake-code-view-html-2');
		
		code_viewer_html.innerHTML = result;
		
		S(cv)
		.after(code_viewer_html);
		
		
		//Put Line Numbers
		var code_line_nums = S('$new','div');
		
		code_line_nums.setAttribute("class","javasnake-code-line-nums-html-2");
		
		var codeLineNums = 1,
			numsResult   = "";
		for(var i=0; i<lines.length; i++){
			
			numsResult += "<span>" + codeLineNums + "</span>";
			codeLineNums++;
			
		}
		code_line_nums.innerHTML = numsResult;
		
		S(cv)
		.after(code_line_nums);
		
	});
	//A Function For Toggling Code Styles
	function code_keyword(ch){
		
		if(ch == null) return true;
		else
			if(ch.search(/\w/) == -1)return true;//If Not A Sign
			else return false;
		
	}
});