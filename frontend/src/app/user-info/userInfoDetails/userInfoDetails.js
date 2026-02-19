import styles from "./userInfoDetails.module.css";

import UserInfoModel from "../../../../models/UserInfoModel";

export default function UserInfoDetails(props) {
  return (
    <section>
      <div className={styles.firstRow}>
        <div className="primaryEmeraldInput">
          <label>First name</label>
          <input
            type="text"
            placeholder="John"
            value={props.userInfo.firstName}
            onChange={(event) => {
              props.setUserInfo((prev) => {
                const copy = new UserInfoModel(prev);
                copy.firstName = event.target.value;
                return copy;
              });
            }}
          ></input>
        </div>
        <div className="primaryEmeraldInput">
          <label>Last name</label>
          <input
            type="text"
            placeholder="Doe"
            value={props.userInfo.lastName}
            onChange={(event) => {
              props.setUserInfo((prev) => {
                const copy = new UserInfoModel(prev);
                copy.lastName = event.target.value;
                return copy;
              });
            }}
          ></input>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className="primaryEmeraldInput">
          <label>Email</label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            value={props.userInfo.email}
            onChange={(event) => {
              props.setUserInfo((prev) => {
                const copy = new UserInfoModel(prev);
                copy.email = event.target.value;
                return copy;
              });
            }}
          ></input>
        </div>
      </div>

      <div className={styles.thirdRow}>
        <div className="primaryEmeraldInput">
          <label>Phone</label>
          <input
            type="text"
            placeholder="(123) 456-789"
            value={props.userInfo.phone}
            onChange={(event) => {
              props.setUserInfo((prev) => {
                const digits = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);

                let formatted = digits;
                if (digits.length > 3 && digits.length <= 6)
                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                else if (digits.length > 6)
                  formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;

                const copy = new UserInfoModel(prev);
                copy.phone = formatted;
                return copy;
              });
            }}
          ></input>
        </div>
      </div>
    </section>
  );
}
