import json
FONTS=open('fonts-embed.css').read()
STYLE='''<style>
 :root{--navy:#1F3A5F;--gold:#B8902E;--gold-lt:#C9A24B;--cream:#FAF6EE;}
 *{margin:0;box-sizing:border-box;}
 html,body{background:#000;}
 .stage{position:relative;width:1080px;height:1350px;overflow:hidden;
   background:radial-gradient(120% 80% at 50% 118%, rgba(201,162,75,.30) 0%, rgba(201,162,75,.10) 34%, rgba(250,246,238,0) 60%),
     radial-gradient(90% 60% at 50% -12%, rgba(31,58,95,.06) 0%, rgba(250,246,238,0) 55%), var(--cream);}
 .top{position:absolute;top:74px;left:0;right:0;text-align:center;}
 .kicker{font-family:"Inter",sans-serif;font-weight:600;letter-spacing:5px;font-size:16px;text-transform:uppercase;color:var(--gold);}
 .reference{position:absolute;top:196px;left:0;right:0;text-align:center;font-family:"Playfair Display",serif;font-weight:700;font-size:78px;color:var(--navy);}
 .subtitle{position:absolute;top:300px;left:150px;right:150px;text-align:center;font-family:"Playfair Display",serif;font-style:italic;font-weight:500;font-size:33px;line-height:1.45;color:var(--gold);}
 .verse{position:absolute;top:566px;left:300px;right:300px;text-align:center;font-family:"Playfair Display",serif;font-weight:400;font-size:46px;line-height:1.72;color:var(--navy);}
 .ph{border-radius:3px;padding:0 3px;-webkit-box-decoration-break:clone;box-decoration-break:clone;}
 .note{position:absolute;font-family:"Caveat",cursive;font-size:36px;line-height:1.12;}
 .arrows{position:absolute;inset:0;pointer-events:none;}
 .arrows path{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3;}
 .sowhat{position:absolute;left:110px;right:110px;bottom:150px;text-align:center;}
 .sowhat .lbl{display:inline-block;margin-bottom:16px;font-family:"Inter",sans-serif;font-weight:700;letter-spacing:3px;font-size:16px;text-transform:uppercase;color:#fff;background:var(--navy);padding:8px 20px;border-radius:22px;}
 .sowhat p{margin:0;font-family:"Playfair Display",serif;font-weight:600;font-size:38px;line-height:1.34;color:var(--gold);}
 .mark{position:absolute;left:0;right:0;bottom:60px;text-align:center;}
 .mark .rule{width:60px;height:2px;background:var(--gold);margin:0 auto 14px;opacity:.7;}
 .mark .name{font-family:"Playfair Display",serif;font-weight:700;font-size:27px;color:var(--navy);}
 .mark .tag{display:block;margin-top:5px;font-family:"Inter",sans-serif;font-weight:500;letter-spacing:2px;font-size:14px;text-transform:uppercase;color:var(--gold);}
</style>'''
ARC='<svg width="132" height="52" viewBox="0 0 132 52" fill="none" stroke="#C9A24B" stroke-width="3" stroke-linecap="round"><path d="M40 44 A 26 26 0 0 1 92 44" fill="none"/><line x1="66" y1="10" x2="66" y2="2"/><line x1="38" y1="20" x2="32" y2="14"/><line x1="94" y1="20" x2="100" y2="14"/><line x1="24" y1="34" x2="15" y2="32"/><line x1="108" y1="34" x2="117" y2="32"/><line x1="10" y1="47" x2="122" y2="47" opacity="0.85"/></svg>'
JS='''<script>
window.NOTES=__NOTES__;
var COLORS=[{ink:"#8A4B4B",hl:"rgba(138,75,75,0.22)"},{ink:"#B8902E",hl:"rgba(201,162,75,0.32)"},{ink:"#3E5C82",hl:"rgba(62,92,130,0.22)"},{ink:"#A9603A",hl:"rgba(169,96,58,0.22)"}];
function addPath(svg,d,stroke){var p=document.createElementNS("http://www.w3.org/2000/svg","path");p.setAttribute("d",d);p.setAttribute("stroke",stroke);svg.appendChild(p);}
function layout(){try{
 var stage=document.getElementById("stage"),sb=stage.getBoundingClientRect(),svg=document.getElementById("arrows");
 var lc=0,rc=0;
 var items=window.NOTES.map(function(n,idx){
   var c=COLORS[idx%4], ph=document.querySelector('.ph[data-i="'+n.i+'"]'); ph.style.background=c.hl;
   var rects=Array.prototype.slice.call(ph.getClientRects()).map(function(r){return {l:r.left-sb.left,r:r.right-sb.left,t:r.top-sb.top,b:r.bottom-sb.top};});
   var uL=Math.min.apply(null,rects.map(function(r){return r.l;})),uR=Math.max.apply(null,rects.map(function(r){return r.r;}));
   var midX=(uL+uR)/2, side; if(midX<520)side="left";else if(midX>560)side="right";else side=(lc<=rc?"left":"right");
   if(side==="left")lc++;else rc++;
   var tr=side==="left"?rects.reduce(function(a,b){return b.l<a.l?b:a;}):rects.reduce(function(a,b){return b.r>a.r?b:a;});
   return {n:n,c:c,side:side,tr:tr};
 });
 ["left","right"].forEach(function(side){
   var list=items.filter(function(i){return i.side===side;}).sort(function(a,b){return a.tr.t-b.tr.t;}),last=150;
   list.forEach(function(it){
     var el=document.createElement("div");el.className="note";el.style.color=it.c.ink;el.style.width="196px";el.style.textAlign=side;
     el.innerHTML=it.n.text.split("|").join("<br>");stage.appendChild(el);
     var nh=el.offsetHeight,nw=el.offsetWidth;
     var ny=Math.max(last+26,it.tr.t-nh/2);ny=Math.min(ny,1130-nh);
     el.style.top=ny+"px";if(side==="left")el.style.left="66px";else el.style.right="66px";
     last=ny+nh;it.ny=ny;it.nh=nh;it.nw=nw;
   });
 });
 items.forEach(function(it){
   var side=it.side,dir=side==="left"?1:-1;
   var targetX=(it.tr.l+it.tr.r)/2, pt=it.tr.t, gapY=pt-17;
   var nx=side==="left"?(66+it.nw+8):(1080-66-it.nw-8), ny=it.ny+it.nh/2;
   var c1x=nx+dir*46, c2x=targetX-dir*22;
   var d="M "+nx+" "+ny+" C "+c1x+" "+gapY+", "+c2x+" "+gapY+", "+targetX+" "+(pt-2);
   addPath(svg,d,it.c.ink);
   var ty=pt-2;
   addPath(svg,"M "+targetX+" "+ty+" q -8 -6 -10 -13 M "+targetX+" "+ty+" q 8 -6 10 -13",it.c.ink);
 });
 window.__done=true;
}catch(e){window.__err=String(e);}}
document.fonts.ready.then(layout);
</script>'''
import re
def ph(v): return re.sub(r'\[\[(\d+):(.*?)\]\]', r'<span class="ph" data-i="\1">\2</span>', v)
def make(c):
    notes=json.dumps([{"i":n[0],"text":n[1]} for n in c["notes"]], ensure_ascii=False)
    body=('<div class="stage" id="stage"><div class="top">'+ARC+'<div class="kicker">'+c["kicker"]+'</div></div>'
      '<div class="reference">'+c["ref"]+'</div><div class="subtitle">'+c["sub"]+'</div>'
      '<div class="verse" id="verse">&ldquo;'+ph(c["verse"])+'&rdquo;</div>'
      '<svg class="arrows" id="arrows" viewBox="0 0 1080 1350" fill="none"></svg>'
      '<div class="sowhat"><span class="lbl">So what — today?</span><p>'+c["take"]+'</p></div>'
      '<div class="mark"><div class="rule"></div><div class="name">The Daily Walk Newsletter</div><span class="tag">Walking with God in real life</span></div></div>')
    html=('<!DOCTYPE html><html><head><meta charset="utf-8"/><style id="tdw-fonts">'+FONTS+'</style>'+STYLE+'</head><body>'
      +body+JS.replace('__NOTES__',notes)+'</body></html>')
    open('gc_'+c["variant"]+'_'+c["date"]+'.html','w').write(html)
FK="The Daily Walk Newsletter"; PK="The Deeper Walk · Founding Members"
free=[
 dict(date="2026-07-09",ref="Mark 11:24",sub="Powerful prayer starts with a cleared-out heart, not a longer list.",verse="Whatever you [[0:ask for in prayer]], [[1:believe that you have received it]], and [[2:it will be yours]].",notes=[(0,"name it plainly,|not vaguely"),(1,"act like it’s|already on the way"),(2,"the outcome is His;|the trust is yours")],take="Forgive one person out loud — then bring God the mountain."),
 dict(date="2026-07-10",ref="Mark 12:30–31",sub="The whole walk, in one word: love — all the way in.",verse="[[0:Love the Lord your God]] [[1:with all your heart]]… and [[2:love your neighbor as yourself]].",notes=[(0,"the whole Bible,|boiled down"),(1,"not leftovers —|everything"),(2,"the person|in front of you")],take="Pick one person today and love them like they’re you."),
 dict(date="2026-07-11",ref="Mark 13:31",sub="Everything else is temporary. His word isn’t.",verse="[[0:Heaven and earth]] [[1:will pass away]], but [[2:my words will never pass away]].",notes=[(0,"everything|you can see"),(1,"is on|the clock"),(2,"build your|life on this")],take="Build on the one thing that outlasts everything."),
 dict(date="2026-07-12",ref="Mark 14:36",sub="The bravest prayer you’ll ever pray.",verse="Abba, Father… [[0:not what I will]], but [[1:what you will]].",notes=[(0,"He felt the|weight too"),(1,"surrender,|not resignation")],take="Bring Him the hard thing — then hand Him the outcome."),
 dict(date="2026-07-13",ref="John 3:16",sub="The whole gospel in one sentence.",verse="For [[0:God so loved the world]] that he gave [[1:his one and only Son]], that [[2:whoever believes]] in him shall not perish but have [[3:eternal life]].",notes=[(0,"the reason|for the cross"),(1,"not earned —|given"),(2,"‘whoever’ —|that means you"),(3,"eternal life,|starting now")],take="You were loved before you ever loved back."),
 dict(date="2026-07-14",ref="John 11:25",sub="What He said at a grave — and still says.",verse="I am [[0:the resurrection and the life]]. The one who [[1:believes in me]] will [[2:live, even though they die]].",notes=[(0,"said at|a tomb"),(1,"the one thing|He asks"),(2,"death isn’t|the end")],take="Live like the tomb is actually empty."),
 dict(date="2026-07-15",ref="Luke 1:37",sub="The promise that outsizes every problem.",verse="For [[0:nothing]] [[1:will be impossible]] [[2:with God]].",notes=[(0,"no|exceptions"),(1,"for the thing|you dread"),(2,"He’s the whole|difference")],take="Hand Him the thing that feels impossible."),
]
prem=[
 dict(date="2026-07-09",ref="Mark 11:25",sub="Forgiveness clears the room for prayer.",verse="When you [[0:stand praying]], if you [[1:hold anything against anyone]], [[2:forgive them]].",notes=[(0,"before you ask|for anything"),(1,"a grudge|clogs the room"),(2,"hand the debt|to the Judge")],take="Forgive one person out loud — then bring God the mountain."),
 dict(date="2026-07-10",ref="Mark 12:43–44",sub="Love gives from the heart, not the leftovers.",verse="This [[0:poor widow]] has put in [[1:more than all the others]]… [[2:all she had to live on]].",notes=[(0,"the one|no one noticed"),(1,"God’s math|is different"),(2,"heart,|not surplus")],take="Give God the real thing today — your whole small heart, not leftovers."),
]
cards=[]
for c in free: c=dict(c); c["variant"]="free"; c["kicker"]=FK; cards.append(c)
for c in prem: c=dict(c); c["variant"]="premium"; c["kicker"]=PK; cards.append(c)
fbd={c["date"]:c for c in cards if c["variant"]=="free"}
for d in ["2026-07-11","2026-07-12","2026-07-13","2026-07-14","2026-07-15"]:
    c=dict(fbd[d]); c["variant"]="premium"; c["kicker"]=PK; cards.append(c)
for c in cards: make(c)
print("generated", len(cards), "card html files")
