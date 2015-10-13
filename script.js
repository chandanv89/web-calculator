window.onload = function(){
   window.calci = new Calculator();
   calci.init();
}

var Calculator = function(){
   var calcStr = "+";
   var _this = this;
   var clrDisp = false;
   
   this.getDisplayElement = function(){
      var disp = document.getElementById("display");
      
      return {
         'element' : disp,
         'value' : disp.innerHTML,
         'update' : function(_val){
            var curVal = disp.innerHTML;
            var updatedVal = "0";
            var val = _val.toString();
            
            if(clrDisp){
               clrDisp = false;
               calcStr = "+";
               curVal = "0";
               updatedVal = "0";
               val = _val.toString();
            }
           
            switch(val.match(/[acdmnprst0-9]/)[0]){
               case 'a':
                  if(calcStr.length > 1 && calcStr.charAt(calcStr.length-1) != "+")
                     calcStr = calcStr.concat("+");
                  val = "+"; break;
                  
               case 'd': 
                  if(calcStr.length > 1 && calcStr.charAt(calcStr.length-1) != "/")
                     calcStr = calcStr.concat("/");
                  val = "/"; break;
                  
               case 'm': 
                  if(calcStr.length > 1 && calcStr.charAt(calcStr.length-1) != "*")
                     calcStr = calcStr.concat("*");
                  val = "*"; break;
                
               case 'c':
                  val = "";
                  calcStr = "+";
                  updatedVal = 0;
                  break;
               
               case 'n':
                  var sign = calcStr[0].match(/[\+\-]/)[0];
                  if(sign == "+")
                     calcStr = '-' + calcStr.substring(1,calcStr.length);
                  else
                     calcStr = '+' + calcStr.substring(1,calcStr.length);
                  
                  val = "";
                  updatedVal = (curVal!=0) ? (curVal * -1) : curVal;
                  break;
               
               case 'p':
                  val = "";
                  var ops = calcStr.match(/[\+\-\*\/]/gi) || [];
                  var lastNumber = calcStr.substring(calcStr.lastIndexOf(ops[ops.length-1])+1,calcStr.length)
                  calcStr = ((lastNumber.indexOf('.')==-1) ? calcStr.concat(".") : calcStr);
                  updatedVal = ((curVal.toString().indexOf('.') > 0) ? curVal : (curVal.toString() + '.'));
                  break;
                  
               case 'r': val = ""; break;
               case 's': 
                  if(calcStr.length > 1 && calcStr.charAt(calcStr.length-1) != "-")
                     calcStr = calcStr.concat("-");
                  val = "-"; break;
                  
               case 't':
                  if(calcStr != "+" && calcStr != ".")
                     calcStr = updatedVal = eval(calcStr) + "";
                  clrDisp = true;
                  break;
               
               //default: curVal = (curVal == 0) ? val : curVal.toString() + val;
               default:
                  if(val != "")
                     updatedVal = (curVal == 0) ? val : updatedVal + val;
                  else
                     updatedVal += val;
                  calcStr = calcStr.concat(val);
            }
            console.log("calcStr: " + calcStr + ", updatedVal: " + updatedVal);
            var dispStr = ((calcStr[0]=="+") ? calcStr.substring(1,calcStr.length) : calcStr);
            disp.innerHTML = dispStr || "0";
         },
         'init': function(){
            disp.innerHTML = "0";
         }
      };
   };

   _this.display = this.getDisplayElement();
   
   _this.init = function(){
      _this.display.init();
   }
   
   return _this;
} 

var clicked = function(id){
   var disp = window.calci.display;
   var dispContent = disp.value || "";
   var btnId = id.id;
   var btnValue = btnId.match(/[acdmnprstx0-9]/);
   console.log(btnValue);
   disp.update(btnValue);
}