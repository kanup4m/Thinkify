const Inbox = ({ id, info, childToParent }) => {
    var metaData = info.filter(function (data) {
        return data.id === id.id;
    });
    const regex = /<[^>]*>/gim;

    return (
        <div className="email-view">
            {id ? (
                <div>
                    <div className="favorite">
                        <button onClick={() => childToParent(metaData[0])}>
                            Mark as Favorite
                        </button>
                    </div>
                    <h1 className="name">{metaData[0].subject}</h1>
                    <small className="">
                        {Intl.DateTimeFormat("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }).format(metaData[0].date)}
                    </small>

                    <p>{id.body.replace(regex, " ")}</p>
                </div>
            ) : (
                <div>Loading post...</div>
            )}
        </div>
    );
};

export default Inbox;
