!function(t,e,n,o,r,i,a){function s(){var t=g();if(null!==t){var e=M.selectAll(".u").data(f.words).attr("transform",function(e,n){return e.rotate?e.rotate=e.rotate:e.rotate=10*(Math.random()-.5),"translate("+(200*t.get(n,0)*I+j+400)+","+(200*t.get(n,1)*I+D+400)+")rotate("+e.rotate+")"});e.selectAll("rect").style("fill-opacity",function(t){return t.init===!0&&O>0?Math.max(Math.min(.9-Math.sqrt(.09*O),.9),0):.9}),O--}}function l(){var t=e(".viewport").width(),n=600;M.attr("width",t).attr("height",n)}function c(){j=n.event.translate[0],D=n.event.translate[1],I=n.event.scale}function u(){var t=M.selectAll(".b").data(f.words).enter().append("g").attr("class","u");t.append("rect").attr("width",function(t){return 8*t.str.length+10}).attr("height",20).attr("rx",5).attr("ry",5).style("fill",function(t){return a({luminosity:"light",seed:t.str})}),t.append("text").attr("text-anchor","middle").attr("x",function(t){return 4*t.str.length+5}).attr("y",10).attr("alignment-baseline","central").attr("fill","#333").text(function(t){return t.str})}function d(){var t=n.select(".viewport");M=t.append("svg"),u(),P(M),n.select(window).on("resize",l),l()}function w(){S&&console.time("step"),m(),S&&console.timeEnd("step");Math.round(k/(o.now()-N)*1e3);s(),10===k&&h&&window.console&&window.console.profile&&console.profileEnd(),window.requestAnimationFrame(w)}var f,p,g,v,m,h=!1,S=!1,E="tsneez",y="/tsneez",z=y+"/javascripts/scienceai-worker.js",A=y+"/data/shortglove.json",x=700,k=0,R=10;switch(E){case"tsneez":p=new t.TSNEEZ({theta:.5,perplexity:R,randomProjectionInitialize:!1}),v=function(t){p.initData(t)},m=function(){return k++,p.step()},g=function(){return p.Y};break;case"karpathy":p=new r.tSNE({perplexity:R}),v=function(t){p.initDataRaw(t)},m=function(){return k++,p.step()},g=function(){var t=p.getSolution();return{get:function(e,n){return t[e][n]}}};break;case"scienceai":var T=new Worker(z),b=null,N=o.now();T.onmessage=function(t){var e=t.data;switch(e.type){case"PROGRESS_STATUS":break;case"PROGRESS_ITER":break;case"PROGRESS_DATA":var n=o.now();S===!0&&(null===b?console.log("initialization",n-N+"ms"):console.log("step",n-N+"ms")),b=e.data,N=o.now(),k++;break;case"STATUS":console.log("status",e.data);break;case"DONE":b=e.data}},v=function(t){T.postMessage({type:"INPUT_DATA",data:t}),T.postMessage({type:"RUN",data:{perplexity:30,earlyExaggeration:4,learningRate:10,nIter:1e3,metric:"euclidean"}})},m=function(){},g=function(){return null===b?{get:function(){return null}}:{get:function(t,e){return b[t][e]}}},S=!1}var M,O=0,P=n.behavior.zoom().scaleExtent([5e-4,10]).center([0,0]).on("zoom",c),j=0,D=0,I=1,N=o.now();e(window).load(function(){e.getJSON(A,function(t){t.words=t.words.map(function(t){return{str:String(t),init:!0}}),f={words:t.words.slice(0,x),vecs:t.vecs.slice(0,x)},h&&window.console&&window.console.profile&&console.profile("initialization"),S&&console.time("initialization"),v(f.vecs),S&&console.timeEnd("initialization"),h&&window.console&&window.console.profile&&console.profileEnd(),d(),h&&window.console&&window.console.profile&&console.profile("step"),window.requestAnimationFrame(w),e("#addPoints").click(function(){O=10,f.words=f.words.map(function(t){return t.init=!0,t});for(var e=0;e<10;e++){var o=t.words[x];o.init=!1,p.add(t.vecs[x]),f.words.push(o),x++}n.selectAll(".viewport > svg").remove(),d()})}).fail(function(t,e,n){console.log("getJSON failed, status: "+e+", error: "+n)})})}(tsneez,$,d3,performance,tsnejs,TSNE,randomColor);