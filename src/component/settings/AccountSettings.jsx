import React, { useState } from "react";
import BottomTab from "../../more/BottomTab";
import Footer from "../../more/Footer";
import Header from "../Home/Header";
import EditProfileModal from "../settings/modals/EditProfileModal";
import ChangePasswordModal from "../settings/modals/ChangePasswordModal";
import ChangeEmailModal from "../settings/modals/ChangeEmailModal";
import "./AccountSettings.css";

const AccountSettings = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const settingsData = [
    {
      title: "Password",
      desc: "Change your password",
      button: "Change Password",
      icon: "\ud83d\udd10",
      action: () => setShowChangePassword(true),
    },
    {
      title: "Profile Edit",
      desc: "Edit your profile picture, name",
      button: "Edit Avatar",
      icon: "\u270d\ufe0f",
      action: () => setShowEditProfile(true),
    },
    {
      title: "Emails",
      desc: "Change your email address",
      button: "Update Email Address",
      icon: "\ud83d\udce7",
      action: () => setShowChangeEmail(true),
    },
    
  ];

  return (
    <>
      <Header />
      <div className="account-settings">
        <h2>Account Settings</h2>
        <div className="settings-grid">
          {settingsData.map((item, index) => (
            <div className="settings-card" key={index}>
              <div className="icon-box">{item.icon}</div>
              <div className="content-box">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                {item.button && (
                  <button onClick={item.action}>{item.button}</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />

      <ChangeEmailModal
        isOpen={showChangeEmail}
        onClose={() => setShowChangeEmail(false)}
      />

      <Footer />
      <BottomTab />
    </>
  );
};

export default AccountSettings;
