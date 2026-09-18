package com.jarvis.v6;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.view.View;

public final class JarvisHudView extends View {
    private final Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
    private float phase;
    private boolean active;
    public JarvisHudView(Context c) { super(c); p.setTypeface(android.graphics.Typeface.create("sans", android.graphics.Typeface.BOLD)); }
    public void setActive(boolean v) { active=v; invalidate(); }
    @Override protected void onDraw(Canvas c) {
        super.onDraw(c);
        int w=getWidth(), h=getHeight(); float cx=w/2f, cy=h/2f;
        p.setStyle(Paint.Style.STROKE); p.setStrokeWidth(1); p.setColor(0x2233DFFF);
        for(int x=0;x<w;x+=40)c.drawLine(x,0,x,h,p);
        for(int y=0;y<h;y+=40)c.drawLine(0,y,w,y,p);
        p.setColor(0xE600D4FF); p.setStrokeWidth(2);
        for(int i=0;i<3;i++){ float r=62+i*28; c.save(); c.rotate(i%2==0?phase:-phase,cx,cy); c.drawArc(new RectF(cx-r,cy-r,cx+r,cy+r),i*60,250,false,p); c.restore(); }
        p.setStyle(Paint.Style.FILL); p.setColor(0x3300D4FF); c.drawCircle(cx,cy,43,p); p.setColor(0xCC00D4FF); c.drawCircle(cx,cy,12,p);
        p.setStyle(Paint.Style.STROKE); p.setStrokeWidth(active?3:1); p.setColor(active?0xFF63F7FF:0x7733DFFF); c.drawCircle(cx,cy,48+(float)Math.sin(phase/12)*3,p);
        p.setStyle(Paint.Style.FILL); p.setTextAlign(Paint.Align.CENTER); p.setTypeface(android.graphics.Typeface.create("sans",android.graphics.Typeface.BOLD)); p.setTextSize(13); p.setColor(0xFFB9F7FF); c.drawText("JARVIS",cx,cy+70,p);
        p.setTextSize(9); p.setColor(0x889DEBFF); c.drawText(active?"PROCESSING":"STANDBY",cx,cy+87,p);
        phase += 0.9f; postInvalidateDelayed(32);
    }
}
