


    let avatars={
        newThreads:[ '🐣', '🚼','🍼'],
        sport:['🏈','⚾','🏀','🏃🏼‍♂️'],
        news:['📰','🌎','🎓'],
        popular:['🔥','🤯']
    }


function createAvatar(genre){
    if(genre === "new"){
        return avatars.newThreads[Math.random() * avatars.newThreads.length | 0]
    }
    else if(genre === "sports"){
        return avatars.sports[Math.random() * avatars.sports.length | 0]

    }

    else if(genre === "news"){
        return avatars.news[Math.random() * avatars.news.length | 0]

    }

    else{
        return avatars.popular[Math.random() * avatars.popular.length | 0]

    }
}


module.exports = createAvatar