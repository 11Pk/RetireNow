function posts()
{
    return(<div>
{/* Quote of the Day */}
<div>
<div>
    <h1>Everyday is a new beginning - embrace it with joy</h1>
</div>
{/* My interest groups */}
<div>
    <h3>Gardening</h3>
    <h3>Music</h3>
    <h3>Reading</h3>
    <h3>Volunteering</h3>
</div>
</div>
{/* Post Block */}
        <div className=""> 
            {/* Details */}
            <div>
                <h3>Ramesh</h3>
                <img src="" alt="profile pic"/>
                <p>Time</p>
            </div>
            <div className="">
                Post Content
            </div>
            <div>
                {/* Comment */}
                {/* Like */}
            </div>

        </div>
    </div>)
}
export default posts;