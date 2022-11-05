package com.skynews.service.impl;

import com.skynews.dao.FocusMapper;
import com.skynews.pojo.Focus;
import com.skynews.service.FocusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FocusServiceImpl implements FocusService {

    //service层调dao层：组合dao
    @Autowired
    private FocusMapper focusMapper;
    public void setFocusMapper(FocusMapper focusMapper){
        this.focusMapper=focusMapper;
    }


    @Override
    public int addFocus(Focus focus) {
        return focusMapper.addFocus(focus);
    }

    @Override
    public int deleteFocus(Focus focus) {
        return focusMapper.deleteFocus(focus);
    }

    @Override
    public List<Focus> queryAllFans(int focusID) {
        return focusMapper.queryAllFans(focusID);
    }

    @Override
    public List<Focus> queryAllFocus(int fansID) {
        return focusMapper.queryAllFocus(fansID);
    }

    @Override
    public int queryFocus(Focus focus) {
        Focus focus1=focusMapper.queryFocus(focus);
        if(focus1!=null){
            return 1;
        }else {
            return 0;
        }
    }

    @Override
    public int querySumFans(int focusID) {
        List<Focus> list=focusMapper.queryAllFans(focusID);
        if(list.isEmpty()){
            return 0;
        }
        else{
            return focusMapper.querySumFans(focusID);
        }
    }

    @Override
    public int querySumFocus(int fansID) {
        List<Focus> list=focusMapper.queryAllFocus(fansID);
        if(list.isEmpty()){
            return 0;
        }
        else{
            return focusMapper.querySumFocus(fansID);
        }
    }

    @Override
    public List<Focus> queryAllFansPage(int focusID, int num) {
        return focusMapper.queryAllFansPage(focusID,num);
    }

    @Override
    public List<Focus> queryAllFocusPage(int fansID, int num) {
        return focusMapper.queryAllFocusPage(fansID,num);
    }
}
