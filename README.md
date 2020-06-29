# Training Plan Generator

The Training Plan Generator provides a set of prebuilt example training plans and a custom plan tool. The aim is to allow runner to create their own plans to fit their goals and the facility to update their goals as they advance.

**Note: I am not a doctor, personal trainer or a sport scientist so always consult your own doctor to make sure you are fit enough to undertake a plan!**

The plans are based of knowledge I gained from my own running, other experience runners advice, podcasts and of course any training plans I have seen. There has been no meta analysis of the plans so it's all ball park guestimation to create something that I feel would work for me currently and would have worked for me as I have progressed. The aim if for this to work for me as I advance myself.

## Features:

### Running

Running is the name of the game! These are the core activities you are presented with.

#### Easy day

This is a day that is meant to just loosen up and keep moving. It almost always follows a long hard day. It also features more in the run up to the race day and during the taper weeks.

#### Base running days

Getting miles into your legs is key for being able to undertake longer and harder distances. Base days fill this gap.

#### Training / HIT days

A part of running is pushing limits. HIT training is designed to push your body to the limits so you can grow as an athlete. Depending on your end goal they can be in the form of:

- Intervals / Fartlek / Sprints
- Hill sprints / Pyramids

#### Long running days

The end goal of these plans is increasing the distance you can run. This is achieved using incrementally longer runs every week. To add some extra dynamic to this progresssion there are various longer run types. With the exception of regular long runs and recovery the others are classed as special. A week with a special is normally followed by a recovery week.

- Regular long run
- Double headers (2 consecutive days) of long runs totallling more than a normal long run but each separate run is not as long as the normal long run eg. 1/2 and 2/3 length.
- Recovery runs are shorter than a normal long run but still enough to be classed as long.
- Extra long runs push the distance further than the normal progression.

#### Rest

This is a day off running 😱, however you can do some core or cross training on these days if you want to! Just keep it easy on those legs!

### Example data

```javascript
{
    "weekNumber": 6,
    "weekStartdate": "moment",
    "weekFocus": "special",
    "weekDistance": 456700,
    "weekTime": 456382,
    "description": "Notes...",
    "days": [
        {
            "date": "moment",
            "title": "Easy run day",
            "category": "easy",
            "activity": "run",
            "description": "notes...",
            "time": 120000,
            "distance": 34500,
            "effortClass": "endurance",
            "effortRPE": [4, 5],
            "effortHR": [130, 150]
        }
    ]
}
```
