define(["base","config"], function(B, C) {

	var FONTSIZE = 12;
	var TEXTSTYLE = "#222222";
	return {
		setCanvas : function(canvas){
			this.canvas = canvas;
			this.ctx = canvas.getContext("2d");
			return this;
		},
		drawText:function(x,y,w,h,s,ctx){

            ctx.fillStyle = TEXTSTYLE;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.font =FONTSIZE+"px Arial, sans-serif";
            ctx.fillText(s, x+w/2, y+h/2);
        },
        clear : function(){
        	this.ctx.clearRect ( 0 , 0 , this.canvas.width, this.canvas.height );

        },
        drawColHead :function(){
            var ctx = this.ctx;
            ctx.fillStyle = "#eeeeee";
            ctx.strokeStyle = "#CCC";
            ctx.lineWidth = 0.5;
            var startX = 0.5;
            var startY = 0.5;
            startX+=C.rowHeadWidth;

            for(var i=0;i<C.rows;i++){
                ctx.save();
                
                var s = String.fromCharCode((65+i));
                //ctx.moveTo(startX, startY);
                ctx.strokeRect(startX, startY, C.colHeadWidth, C.colHeadHeight);
                ctx.fillRect (startX+0.5, startY+0.5, C.colHeadWidth-1, C.colHeadHeight-1);
                this.drawText(startX+0.5, startY+0.5,C.colHeadWidth-1,C.colHeadHeight-1,s,ctx);
                ctx.restore();
                startX+=C.colHeadWidth;
                
            }
        },
        drawRowHead :function(){
            var ctx = this.ctx;
            ctx.fillStyle = "#eeeeee";
            ctx.strokeStyle = "#CCC";
            ctx.lineWidth = 0.5;
            var startX = 0.5;
            var startY = 0.5;
            ctx.strokeRect (startX, startY, C.rowHeadWidth, C.colHeadHeight);
            ctx.fillRect (startX+0.5, startY+0.5, C.rowHeadWidth-1, C.colHeadHeight-1);
            startY+=C.colHeadHeight;
            for(var i=1;i<C.cols;i++){
                ctx.save();
                //ctx.moveTo(startX, startY);
                ctx.strokeRect(startX, startY, C.rowHeadWidth, C.rowHeadHeight);
                ctx.fillRect (startX+0.5, startY+0.5, C.rowHeadWidth-1, C.rowHeadHeight-1);
                this.drawText(startX+0.5, startY+0.5,C.rowHeadWidth-1,C.rowHeadHeight-1,i,ctx);
                ctx.restore();
                startY+=C.rowHeadHeight;
                
            }
        },
        drawRowColCells : function(){
        	var m_canvas = document.createElement('canvas');
			m_canvas.width = C.colHeadWidth;
			m_canvas.height = C.rowHeadHeight;
			var m_context = m_canvas.getContext('2d');
			m_context.strokeRect(0, 0, C.colHeadWidth, C.rowHeadHeight);
            for(var i=0;i<C.rows;i++){
                for(var j=0,len = C.cols;j<len;j++){
                    this.drawRowColCell(i,j,String.fromCharCode(65+i)+j);
                }
            }
        },

        drawRowColCell : function(row,col,str,m_canvas){
            var ctx = this.ctx;
            var startX = 0.5;
            var startY = 0.5;
            startX += C.rowHeadWidth;
            startY += C.colHeadHeight;

            startX += C.colHeadWidth * row;
            startY += C.rowHeadHeight * col;
            //ctx.moveTo(startX, startY);
            if(m_canvas){
            	ctx.drawImage(m_canvas, startX, startY);
            }else{
            	ctx.strokeRect(startX, startY, C.colHeadWidth, C.rowHeadHeight);
            }
            
            this.drawText(startX+0.5, startY+0.5,C.colHeadWidth-1,C.rowHeadHeight-1,str,ctx);
        },

        drawYAxis: function(){
            this.draw

            var ctx = this.ctx;
            var startX = 0;
            var startY = 0;

            ctx.fillStyle="#F1F1F1";console.log(ctx,startX+0.5, startY+0.5, C.YAXISWIDTH-1, C.height-1);
            ctx.fillRect(startX, startY, C.YAXISWIDTH, C.height);
        }
    }


});