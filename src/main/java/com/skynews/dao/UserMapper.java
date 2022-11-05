package com.skynews.dao;
import com.skynews.pojo.Collections;
import com.skynews.pojo.Picture;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@Repository
public interface UserMapper {
    //邮箱验证
    void mail(String mail,String code);
    //用户注册
    void register(User user);
    //根据用户名得到该密码
    User getPassword(String username);
    //根据用户名得到该密码
    User knowUser(String account);
    //    根据账户得到用户消息
    User getUser(String account);
    //用户修改个人信息
    int updateUser(User user);
    //修改密码
    int changePassword(User user);
    //添加用户
    int addUser(User user);
    //注销用户
    int deleteUserById(@Param("userID") int userID);
    //查询用户
    User queryUserById(@Param("userID") int UserID);
    //查询所有用户
    List<User> queryAllUser();
    //头像更新
    int saveUserProfile(User user);
    //上传文件
    String upload(MultipartFile file);
    //删除focus表里面的用户（关注）
    int deleteFocus(int focusID);

    //删除focus表里面的用户（粉丝）
    int deleteFans(int fansID);

    //通过用户id返回其发布的所有帖子id
    List<Posts> queryPostsID(int reside);

    //根据帖子id删除收藏表里面的帖子
    int deleteCollectionByPostsID(int postsID);
    //删除注销用户发布的帖子
    int deletePostsByUser(int reside);

    //删除注销用户的收藏
    int deleteCollectionByUser(int userID);
    //模糊查询用户
    List<User> vagueQueryUsername(@Param("thing") String thing);
    //通过分页查询用户
    List<User> savePages(@Param("column") int column,@Param("total") int total);
    //对模糊查询的数据进行分页
    List<User> vagueSavePages(@Param("thing") String thing,@Param("column") int column,@Param("total") int total);
//    用户查询自己未审核通过的帖子
    List<Posts> allAuditing(int reside);
    //    用户查询自己审核通过的帖子
    List<Posts> allPass(int reside);
    List<Picture> allAuditingPicture(int userID);
    //用户查询自己审核通过的图片
    List<Picture> allPassPicture(int  userID);
//    对用户发布的文章进行固定每页数量的分页
    List<Posts> disDrafts(int reside,int status,int start,int count);
//    对用户的收藏帖子的分页
    List<Collections> saveCollections(@Param("userID") int userID, @Param("column") int column);
//        <!--用户发布帖子总数-->
    int allCountPosts(int reside);
//    通过id和状态值查询相对应的帖子信息
    List<Posts> trends(@Param("reside") int reside,@Param("status") int status,@Param("start") int start,@Param("count") int count);
    //    获取草稿箱的内容
    List<Posts> drafts(int reside);
    //用户对草稿箱内容进行发布
    int upDrafts(int reside);
//    未通过审核的帖子，已通过审核的帖子，未审核的帖子
    List<Posts> savePosts(int reside,int column);
    //用户根据状态 查询对应的帖子
    List<Picture> onePicture(int userID,int status);
    //根据makerID删除comment
    int deleteCommentByMakerID(int makerID);

    //根据makerID删除reviews
    int deleteReviewsByMakerID(int makerID);

    //根据authorID删除messages
    int deleteMessagesByAuthorID(int authorID);


    /********杨赛雅加的**********/
    //通过帖子id查询帖子
    Posts queryPostsById(int postsID);

}