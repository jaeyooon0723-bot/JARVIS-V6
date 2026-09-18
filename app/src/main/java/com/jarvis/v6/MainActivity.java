package com.jarvis.v6;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends Activity {
    private static final int REQ_MIC=11, REQ_CAMERA=12;
    private static final int REQ_SPEECH=21, REQ_PHOTO=22;
    private SharedPreferences prefs; private TextView status, log; private EditText input; private JarvisHudView hud;
    private GoalEngine engine; private ModelAdapter model; private TextToSpeech tts;

    @Override public void onCreate(Bundle b){ super.onCreate(b); prefs=getSharedPreferences("jarvis",MODE_PRIVATE); engine=new GoalEngine(); model=new LocalFallbackModel(); buildUi(); restore();
        tts=new TextToSpeech(this, s->{ if(s==TextToSpeech.SUCCESS){tts.setLanguage(Locale.UK);}}, ""); }

    private TextView tv(String s,int sp){ TextView t=new TextView(this); t.setText(s); t.setTextColor(Color.rgb(165,235,255)); t.setTextSize(sp); t.setPadding(14,6,14,6); return t; }
    private void buildUi(){
        LinearLayout root=new LinearLayout(this); root.setOrientation(LinearLayout.VERTICAL); root.setBackgroundColor(Color.rgb(7,10,15)); root.setPadding(12,10,12,10);
        status=tv("JARVIS V6  •  READY",12); status.setGravity(Gravity.CENTER); root.addView(status,new LinearLayout.LayoutParams(-1,36));
        hud=new JarvisHudView(this); root.addView(hud,new LinearLayout.LayoutParams(-1,250));
        ScrollView sv=new ScrollView(this); log=tv("",12); log.setTextIsSelectable(true); sv.addView(log); root.addView(sv,new LinearLayout.LayoutParams(-1,0,1));
        input=new EditText(this); input.setHint("자연스럽게 말해줘…"); input.setHintTextColor(0x7799CFE0); input.setTextColor(0xFFEAFBFF); input.setTextSize(15); input.setBackgroundResource(com.jarvis.v6.R.drawable.edit_bg); input.setSingleLine(false); root.addView(input,new LinearLayout.LayoutParams(-1,60));
        LinearLayout row=new LinearLayout(this); row.setGravity(Gravity.CENTER); String[] names={"보내기","🎙","📷","지우기"};
        for(String n:names){Button x=new Button(this); x.setText(n); x.setTextColor(0xFFB9F7FF); x.setBackgroundResource(com.jarvis.v6.R.drawable.button_bg); row.addView(x,new LinearLayout.LayoutParams(0,54,1));
            if(n.equals("보내기"))x.setOnClickListener(v->send()); else if(n.equals("🎙"))x.setOnClickListener(v->startVoice()); else if(n.equals("📷"))x.setOnClickListener(v->camera()); else x.setOnClickListener(v->{log.setText(""); prefs.edit().remove("history").apply();}); }
        root.addView(row); setContentView(root);
    }
    private void restore(){ String h=prefs.getString("history",""); if(!h.isEmpty())log.setText(h); }
    private void add(String s){ log.append((log.length()>0?"\n\n":"")+s); prefs.edit().putString("history",log.getText().toString()).apply(); }
    private void send(){ String q=input.getText().toString().trim(); if(q.isEmpty())return; GoalEngine.Plan p=engine.infer(q); status.setText("JARVIS V6  •  GOAL ANALYSIS"); hud.setActive(true); add("USER  › "+q+"\nGOAL  › "+p.goal+"\nTARGET › "+p.desiredState+"\nCAPABILITY › "+p.capability+"\n\nJARVIS  › "+model.generate(q,log.getText().toString())); input.setText(""); if(tts!=null)tts.speak("목표를 이해했어. 실행 전에 결과를 검증할 준비를 했어.",TextToSpeech.QUEUE_FLUSH,null,"jarvis"); hud.postDelayed(()->{hud.setActive(false);status.setText("JARVIS V6  •  VERIFIED READY");},1200); }
    private void startVoice(){ if(checkSelfPermission(Manifest.permission.RECORD_AUDIO)!=PackageManager.PERMISSION_GRANTED){requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO},REQ_MIC);return;} Intent i=new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH); i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "ko-KR"); i.putExtra(RecognizerIntent.EXTRA_PROMPT,"JARVIS에게 말해줘"); startActivityForResult(i,REQ_SPEECH); }
    private void camera(){ Intent i=new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE); if(i.resolveActivity(getPackageManager())!=null){startActivityForResult(i,REQ_PHOTO);} else {add("JARVIS › 이 기기에서 카메라 앱을 찾지 못했어.");} }
    @Override protected void onActivityResult(int r,int c,Intent d){super.onActivityResult(r,c,d); if(c==RESULT_OK&&r==REQ_SPEECH&&d!=null){ArrayList<String> a=d.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS); if(a!=null&&!a.isEmpty()){input.setText(a.get(0));send();}} else if(c==RESULT_OK&&r==REQ_PHOTO){add("JARVIS › 카메라 관찰 입력을 받았어. 실제 비전 모델 연결 전까지는 촬영 상태만 기록해.");}}
    @Override public void onRequestPermissionsResult(int r,String[] p,int[] g){super.onRequestPermissionsResult(r,p,g); if(r==REQ_MIC&&g.length>0&&g[0]==PackageManager.PERMISSION_GRANTED)startVoice();}
    @Override protected void onDestroy(){if(tts!=null){tts.stop();tts.shutdown();}super.onDestroy();}
}
