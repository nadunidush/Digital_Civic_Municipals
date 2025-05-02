function FeedbackTile(props) {
    const { name, email, profile, description } = props;

    return (
        <>
            <div className="px-4 py-3 w-80 bg-feedback-bgcolor shadow-md shadow-gray-400 rounded-sm">
                <img src="src/assets/icons/feedback.png" alt="Feedback" width={40}/>
                <p className="mt-5">{description}</p>
                <div className="flex flex-row mt-4">
                    <img className="rounded-full" src={profile} alt="Profile" width={50} height={50}/>
                    <div className="ml-5">
                        <p>{name}</p>
                        <p>{email}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FeedbackTile;
