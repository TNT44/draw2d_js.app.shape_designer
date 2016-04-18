/* jshint evil: true */

shape_designer.dialog.FigureTest = Class.extend(
{

    init:function(){
    },

	show:function(){
		var writer = new shape_designer.FigureWriter();
		
		writer.marshal(app.view, "testShape",function(js){
			try{
				eval(js);
			}
			catch(exc){
				alert("Error in shape code. \nRemove error and try it again:\n\n>>    "+exc);
				throw exc;
			}
	        var splash = $(
				'<div class="overlay-scale">'+
	                '<div id="test_canvas">'+
	                '</div>'+
				    ' <div               id="test_info" >Test page for your designed and coded draw2d shape.</div>'+
				    ' <div title="Close" id="test_close" class="icon ion-ios-close-outline"></div>'+
				'<div>');

	        // fadeTo MUSS leider sein. Man kann mit raphael keine paper.text elemente einfügen
	        // wenn das canvas nicht sichtbar ist. In diesen Fall mach ich das Canvas "leicht" sichtbar und raphael ist
	        // zufrieden.
	        $("body").append(splash);

			var canvas    = new draw2d.Canvas("test_canvas");
			canvas.installEditPolicy( new draw2d.policy.canvas.ShowDotEditPolicy(20,1,"#FF4981"));
			var router = new draw2d.layout.connection.InteractiveManhattanConnectionRouter();
			canvas.installEditPolicy( new draw2d.policy.connection.ComposedConnectionCreatePolicy(
					[
						// create a connection via Drag&Drop of ports
						//
						new draw2d.policy.connection.DragConnectionCreatePolicy({
							createConnection:function(){
								return new draw2d.Connection({
									radius:3,
									stroke:2,
									color: "#129CE4",
									outlineStroke:1,
									outlineColor:"#ffffff",
									router: router});
							}
						}),
						// or via click and point
						//
						new draw2d.policy.connection.OrthogonalConnectionCreatePolicy({
							createConnection:function(){
								return new draw2d.Connection({
									radius:3,
									stroke:2,
									color: "#129CE4",
									outlineStroke:1,
									outlineColor:"#ffffff",
									router: router});
							}
						})
					])
			);
			var test = new testShape();
			canvas.add( test,400,160);

			// create and add two nodes which contains Ports (In and OUT)
			//
			var start = new draw2d.shape.node.Start();
			var toggle = new shape_designer.figure.TestSwitch();
			var end   = new draw2d.shape.node.End();

			// ...add it to the canvas
			canvas.add( toggle, 50,150);
			canvas.add( start, 50,250);
			canvas.add( end, 630,250);

			canvas.setCurrentSelection(test);
			var removeDialog = function(){
				splash.removeClass("open");
				setTimeout(function(){splash.remove();},400);
			};

			$("#test_close").on("click",removeDialog);
			splash.addClass("open");
		 });

	}

      
});  