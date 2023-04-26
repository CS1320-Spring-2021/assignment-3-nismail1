

var request = [];
var allIds = new Set();

let searchString = "";
var interval;
var checked = 1;

function displayTweets(dataTweets) {
    // create an unordered list to hold the tweets
    searchString = "";
    const tweetContainer = document.getElementById('tweet-container'); 
    //remove the existing tweets from the page
    while (tweetContainer.firstChild) {
        tweetContainer.removeChild(tweetContainer.firstChild);
    }
    const tweetList = document.createElement("ul");
    tweetContainer.appendChild(tweetList);
    // all tweet objects (no duplicates) stored in tweets variable
    // filter on search text
    const filteredResult = dataTweets.filter(obj => obj.text.includes(searchString));

    // sort by date
    const sortedResult = filteredResult.sort((a, b) => moment(a.createdAt).isBefore(moment(b.createdAt)) ? 1 : -1);

    sortedResult.forEach(tweetObject => {
        // create a container for individual tweet
        const tweetContent = document.createElement("post");
        tweetContent.className = 'post'; 
        tweetContent.style.border = "1px solid #E6ECF0";
        // tweetContent.style.backgroundClip = whit
        const img = document.createElement("img");
        img.src = tweetObject.imageUrl;
        img.alt = tweetObject.screenName + "_Profile_Pic";
        tweetContent.appendChild(img);
        //-- append authorNameto div
        const imgDiv = document.createElement("div");
        imgDiv.className = 'tweet';
        const nameDiv = document.createElement("div");
        nameDiv.className= 'name';
        const tweetName = document.createElement("span");
        tweetName.style.fontWeight = 'bold';
        tweetName.innerHTML = tweetObject.authorName;
        nameDiv.appendChild(tweetName);
        //-- append screenName to div
        const tweetScreenName = document.createElement("span");
        
        tweetScreenName.innerHTML = tweetObject.screenName;
        nameDiv.appendChild(tweetScreenName);
        //append div contain img node to main div
        const tweetCreatedAt = document.createElement("span");
        tweetCreatedAt.innerHTML = tweetObject.createdAt;
        tweetCreatedAt.setAttribute('type','date');
        nameDiv.appendChild(tweetCreatedAt);
        imgDiv.appendChild(nameDiv);
        const textDiv = document.createElement("div");
        textDiv.setAttribute('id','post-info');
        const tweetText = document.createTextNode(tweetObject.text);
        textDiv.appendChild(tweetText);
        imgDiv.appendChild(textDiv);
        tweetContent.appendChild(imgDiv);
        //div post-info, append name, user, date, and the div for text
        const postDiv = document.createElement("div");
        //-- append createdAt to div
        
        // finally append your tweet into the tweet list
        tweetList.appendChild(tweetContent);
    });
}

function play() {
    interval = window.setInterval(getTweets, 5000);
  }


function search(){
    const handleSearch = event => {
        searchString = event.target.value.trim().toLowerCase();
      }
      document.getElementById("searchBar").addEventListener("input", handleSearch);
      
       
 }


  
const vueApp = new Vue({
// Vue.component('vue-tweet', {
    el: '#app',
    name: "vue-tweet",
    data: function(){
        return {
            tweets:[],
            searchInput:null,
            display:'HIII'
        };
    },
    beforeMount(){
        // this.getTweets();
    },
    methods: {
     
     },
    computed:{
        searchResult(){
            if(this.searchInput){
                return this.tweets.filter((item)=>{
                  return this.searchInput.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
                })
                }
                else{
                  return this.tweets;
                }
              }
        },
    
    template: `
    <div>
    <ul v-for = "tweet in tweets">
    <li class = "post"> 
    <img :src=tweet.user.profile_image_url alt="profile img">
    <div class="tweetcontent"> </div>
    <div class="name">
        <div class="username">{{tweet.user.name}}</div>
        <div id="postinfo">@{{tweet.user.screen_name}}</div>
        <div id="postinfo">{{tweet.created_at}}</div>
    </div>
    <div id ="post-info">{{tweet.text}}</div>
    </li>
    </ul>
    </div>
    
    `


});

