import React from "react";

function Alert({ message, alertType }) {
  const alert = "alert " + alertType;
  return (
    <div className="mt-3">
      <div className={alert} role="alert">
        {message}
      </div>
    </div>
  );
}

export default Alert;
