<script type="text/javascript">
      var $ = require("jquery");
      const_sdkappid = 1400037025;
      const_accountType = 14418;
      const_usersig = "";
      const_privatemap = "";
      const_roletype = "";
      const_loginsucc = false;
      g_userid = 0;
      g_roomid = 0;

      // 工具函数
      function randomdefault() {
        var userid = randomUserid();
        document.getElementById("userid").value = userid;

        var roomid = randomRoomid();
        document.getElementById("roomid").value = roomid;
      }

      function randomUserid() {
        return parseInt(Math.random() * 10000 + 20000);
      }

      function randomRoomid() {
        return parseInt(Math.random() * 100 + 1500);
      }

      function onLoginSucc() {
        console.log("loginsucc");

        document.getElementById("userid").disabled = true;
        document.getElementById("roomid").disabled = true;
        // $("userid").attr("diabled", "true");
        // $("roomid").attr("diabled", "true");
        var role = document.getElementById("roletype");
        const_roletype = role.options[role.selectedIndex].value;
        console.log(const_roletype);
        document.getElementById("roletype").disabled = true;

        document.getElementById("roletype")
        const_loginsucc = true;

        document.getElementById("login_btn").textContent = "LogOut";
        

      }

      function loginWith(userid, roomid) {
        var FetchSigCgi =
          "https://www.qcloudtrtc.com/sxb_dev/?svc=account&cmd=authPrivMap";
        var params = {
          appid: const_sdkappid,
          accounttype: const_accountType,
          roomnum: parseInt(roomid),
          identifier: userid,
          pwd: "123",
          privMap: 255,
          expire_time: 604800
        };
        console.log(params);
        $.ajax({
          type: "POST",
          url: FetchSigCgi,
          dataType: "json",
          data: JSON.stringify(params),
          success: function(json) {
            if (json && json.errorCode === 0) {
              //一会儿进入房间要用到
              var userSig = json.data.userSig;
              var privateMapKey = json.data.privMapEncrypt;
              const_usersig = userSig;
              const_privatemap = privateMapKey;

              console.log(json);
              onLoginSucc();
            } else {
              console.error(json);
            }
          },
          error: function(err) {
            console.error(err);
          }
        });
      }

      // 登录
      function onClickLogin() {
        if (!const_loginsucc) {
          var userid = document.getElementById("userid").value;
          console.log(userid);
          if (userid.length === 0) {
            alert("UserID不能为空");
            return;
          }

          var roomid = document.getElementById("roomid").value;
          console.log(roomid);
          if (roomid.length === 0) {
            alert("RoomID不能为空");
            return;
          }
          // TODO：添加正整数判断
          console.log("loginwith userid"+ userid +" , roomid :" +roomid);
          
          loginWith(userid, roomid);
        }
        else {
            document.getElementById("userid").disabled = false;
            document.getElementById("roomid").disabled = false;
            
            var role = document.getElementById("roletype");
            const_roletype = role.options[role.selectedIndex].value;
            console.log(const_roletype);
            document.getElementById("roletype").disabled = false;
            document.getElementById("login_btn").textContent = "Login";
            const_usersig = null;
            const_privatemap = null;
            const_loginsucc = false;
        }
      }
      </script>