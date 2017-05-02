package com.bottombar;

import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.view.Menu;
import android.view.MenuItem;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.mikepenz.iconics.IconicsDrawable;

import java.util.Map;

/**
 * Created by brian on 4/23/17.
 */

public class ReactBottomNavViewManager extends ViewGroupManager<BottomNavigationView> {
    public static final String REACT_CLASS = "RCTBottomNav";

    public String getName() {
        return REACT_CLASS;
    }

    public BottomNavigationView createViewInstance(ThemedReactContext context) {
        final BottomNavigationView view = new BottomNavigationView(context);

        view.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {

            @Override
            public boolean onNavigationItemSelected(final @NonNull MenuItem item) {
                ReactContext reactContext = (ReactContext) view.getContext();
                reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                        new Event(view.getId()) {
                            @Override
                            public String getEventName() {
                                return "androidOnTabChange";
                            }

                            @Override
                            public void dispatch(RCTEventEmitter rctEventEmitter) {
                                WritableMap eventData = Arguments.createMap();
                                eventData.putInt("itemId", item.getItemId());
                                rctEventEmitter.receiveEvent(getViewTag(), getEventName(), eventData);
                            }
                        });

                return true;
            }

        });

        return view;
    }

    @ReactProp(name = "selectedIndex")
    public void setSelectedIndex(BottomNavigationView bottomView, int item) {
//        TODO - make setters for these properties
//        view.setItemTextColor(ColorStateList.valueOf(Color.BLACK));
//        view.setItemIconTintList(ColorStateList.valueOf(Color.BLACK));
    }

    @ReactProp(name = "selectedItemId")
    public void setSelectedItemId(BottomNavigationView bottomView, int itemId) {
        System.out.println("Selected item id is being set to " + itemId);
        bottomView.setSelectedItemId(itemId);
    }

    @ReactProp(name = "tabs")
    public void setTabs(BottomNavigationView bottomView, ReadableArray tabs) {
        Menu menu = bottomView.getMenu();

        menu.clear();

        for (int i = 0; i < tabs.size(); i++) {
            ReadableMap tabProps = tabs.getMap(i);

            Drawable drawable = new IconicsDrawable(bottomView.getContext())
                    .icon(tabProps.getString("iconName"));

            // TODO - figure out what to use for the tab id
            int key = tabProps.getString("id").hashCode();
            menu.add(0, key, 0, tabProps.getString("title")).setIcon(drawable);
        }
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of("androidOnTabChange", MapBuilder.of("registrationName", "onTabChange"));
    }
}
