import React, { useEffect, useState } from "react";
import Inbox from "../inbox";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmail } from "../../actions/fetchEmail";
import { fetchId } from "../../actions/fetchId";

const EmailList = () => {
    const [activeMail, setActiveMail] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const emailView = useSelector((state) => state.emailList);
    const emailInbox = useSelector((state) => state.selectedId);
    const dispatch = useDispatch();
    const [data, updateData] = useState([]);
    const [info, updateInfo] = useState([]);
    const [unread, setUnread] = useState([]);
    const [fav, setFav] = useState([]);

    const getData = () => dispatch(fetchEmail);

    const getId = (listData) => dispatch(fetchId(listData));

    const handleActiveState = (id) => {
        setActiveMail(id);
    };

    const handleClicked = (emailView) => {
        if (info.indexOf(emailView) === -1) {
            updateInfo((info) => [...info, emailView]);
        }
    };

    const handleUnread = () => {
        setActiveTab("unread");
    };

    const handleRead = () => {
        setActiveTab("read");
    };

    const handleAll = () => {
        setActiveTab("all");
    };

    const childToParent = (childdata) => {
        if (fav.indexOf(childdata) === -1) {
            setFav((fav) => [...fav, childdata]);
        }
    };

    const handleFav = () => {
        setActiveTab("fav");
    };

    useEffect(() => {
        dispatch(getData());
    }, []);

    useEffect(() => {
        updateData(emailView);
    }, [emailView]);

    useEffect(() => {
        setUnread(data.filter(({ id }) => !info.some((x) => x.id === id)));
    }, [data, info]);

    if (emailView && emailView.length >= 1) {
        return (
            <div className="wrapper">
                <header>
                    <ul>
                        <li
                            onClick={handleAll}
                            className={activeTab === "all" ? "active" : "not-active"}
                        >
                            All <small>{emailView.length}</small>
                        </li>
                        <li
                            onClick={handleRead}
                            className={activeTab === "read" ? "active" : "not-active"}
                        >
                            Read <small>{info.length}</small>{" "}
                        </li>
                        <li
                            onClick={handleUnread}
                            className={activeTab === "unread" ? "active" : "not-active"}
                        >
                            Unread <small>{unread.length}</small>
                        </li>
                        <li
                            onClick={handleFav}
                            className={activeTab === "fav" ? "active" : "not-active"}
                        >
                            Favourite <small>{fav.length}</small>{" "}
                        </li>
                    </ul>
                </header>

                <section className={"main-list"}>
                    <div className={emailInbox ? "card-div" : "new-list"}>
                        {(activeTab === "all"
                            ? emailView
                            : activeTab === "unread"
                                ? unread
                                : activeTab === "read"
                                    ? info
                                    : fav
                        ).map((listData) => {
                            return (
                                <div
                                    onClick={() => {
                                        getId(listData);
                                        handleActiveState(listData.id);
                                        handleClicked(listData);
                                    }}
                                    className={
                                        activeMail === listData.id ? "active-card" : "list-card"
                                    }
                                    key={listData.id}
                                >
                                    <div className="avatar">
                                        <span>{listData.from.email[0]}</span>
                                    </div>
                                    <div className="inner-list">
                                        <h3>
                                            From:{" "}
                                            <b>
                                                {listData.from.name}{" "}
                                                <i>
                                                    {"<"}
                                                    {listData.from.email}
                                                    {">"}{" "}
                                                </i>
                                            </b>
                                        </h3>
                                        <h3>
                                            Subject: <b>{listData.subject}</b>
                                        </h3>
                                        <p>{listData.short_description}</p>
                                        <small>
                                            {Intl.DateTimeFormat("en-US", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }).format(listData.date)}
                                        </small>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {emailInbox ? (
                        <Inbox
                            id={emailInbox}
                            info={emailView}
                            childToParent={childToParent}
                        />
                    ) : null}
                </section>
            </div>
        );
    } else {
        return (
            <div className="loading">
                <h1>Loading ...</h1>
            </div>
        );
    }
};

export default EmailList;