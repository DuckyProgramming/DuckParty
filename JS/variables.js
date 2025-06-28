stage={scene:`minigame`}
constants={trig:[[],[]],gravity:1.25,itemSlots:3,sqrt2:0,sqrt3:0,index:0}
dev={bound:false}
transition={trigger:false,anim:0,scene:stage.scene}
graphics={main:undefined}
inputs={
    keys:[
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
    ],tap:[
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
    ],
}
types={
    board:[
        {
            name:'Miniboards',
            spaces:[
            ]
        },
    ],space:[
        {name:`Blank Space`},
        {name:`Blue Space`},
        {name:`Red Space`},
        {name:`Lucky Space`},
        {name:`Unlucky Space`},
        {name:`Event Space`},
        {name:`Stop Space`},
        {name:`Conduckator Space`},
        {name:`Lucky Time Space`},
    ],player:[
        {
            name:'Yellow Duck',
            desc:'Start with 5 more coins.',
            color:{
                eye:{back:[0,0,0]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}
            },
        },{
            name:'Blue Duck',
            desc:'Gain 1 more coin from blue spaces.',
            color:{
                eye:{back:[0,0,0]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[25,85,255],body:[15,75,255],legs:[0,60,255],arms:[5,65,255]}
            },
        },{
            name:'Red Duck',
            desc:'Immune to red spaces.',
            color:{
                eye:{back:[0,0,0]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[245,0,25],body:[235,5,15],legs:[230,15,20],arms:[225,10,5]}
            },
        },{
            name:'Green Duck',
            desc:'',
            color:{
                eye:{back:[0,0,0]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[55,235,25],body:[55,225,15],legs:[55,210,0],arms:[55,215,5]}
            },
        },{
            name:'Orange Duck',
            desc:'',
            color:{
                eye:{back:[0,0,0]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[235,105,25],body:[225,105,15],legs:[210,105,0],arms:[215,105,5]}
            },
        },{
            name:'Pink Duck',
            desc:'',
            color:{
                eye:{back:[0,0,0]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[235,25,255],body:[225,15,255],legs:[210,0,255],arms:[215,5,255]}
            },
        },{
            name:'White Duck',
            desc:'Start with a Double Dice item.',
            color:{
                eye:{back:[0,0,0]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[],body:[],legs:[],arms:[]}
            },
        },{
            name:'Brown Duck',
            desc:'',
            color:{
                eye:{back:[0,0,0]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[],body:[],legs:[],arms:[]}
            },
        },
    ],color:{
        duck:[
            {
                eye:{back:[0,0,0]},
                beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},
                skin:{head:[160,165,190],body:[150,155,180],legs:[140,145,170],arms:[145,150,175]}
            }
        ],
    },item:[
        /*
        cost -1: cannot be bought
        rarity 0: common, rarity 1: rare
        
        useCase 0: no standard use,
        useCase 1: standard use
        */
        {name:`Double Dice`,desc:`Roll 2 dice and move the total`,cost:5,rarity:0,useCase:1},
        {name:`Triple Dice`,desc:`Roll 3 dice and move the total`,cost:10,rarity:0,useCase:1},
        {name:`Custom Dice`,desc:`Roll any number 1-10`,cost:20,rarity:0,useCase:1},
        {name:`Reverse Dice`,desc:`Rolls negative numbers to move backwards, can be used on opponents`,cost:10,rarity:0,useCase:1},
        {name:`1 or 10 Dice`,desc:`Rolls either a 1 or a 10, can be used on opponents`,cost:3,rarity:0,useCase:1},
        {name:`Curesd Dice`,desc:`Rolls 1-3, can be used on opponents`,cost:3,rarity:0,useCase:1},
        {name:`Lump Dice`,desc:`Earns lumps equal to your roll`,cost:3,rarity:0,useCase:1},
        {name:`0 Dice`,desc:`Always rolls a 0 and retriggers the space`,cost:5,rarity:0,useCase:1},
        {name:`Warp Box`,desc:`Swap with a random opponent`,cost:7,rarity:0,useCase:1},
        {name:`Warp Box Deluse`,desc:`Swap with a selected opponent`,cost:-1,rarity:1,useCase:1},
        {name:`Teleport Box`,desc:`Move next to the bit`,cost:25,rarity:1,useCase:1},

        {name:`Metal Pipe`,desc:`Create a stop space anywhere`,cost:10,rarity:0,useCase:1},
        {name:`Hammer`,desc:`Create a blank space anywhere`,cost:5,rarity:0,useCase:1},
        {name:`Broken Watch`,desc:`Set the game to the last 5 turns`,cost:-1,rarity:1,useCase:1},
        {name:`Key`,desc:`Opens gates on the map`,cost:3,rarity:0,useCase:0},
        {name:`Hidden Box Card`,desc:`Find a hidden box`,cost:20,rarity:0,useCase:1},
        {name:`Shop Whistle`,desc:`Call the shop to buy something`,cost:5,rarity:0,useCase:1},
        {name:`Sound Box`,desc:`Moves the Bit`,cost:5,rarity:0,useCase:1},
        {name:`Bank Card`,desc:`Collect money from the bank when you pass it`,cost:-1,rarity:1,useCase:1},

        {name:`Cursed Dice Block`,desc:`Cause any player to roll from 1-3`,cost:3,rarity:0,useCase:1},
        {name:`Conduckator Whistle`,desc:`Send any player to the Conduckator`,cost:5,rarity:0,useCase:1},
        {name:`Hunterbob Whistle`,desc:`Steal lumps or a bit`,cost:25,rarity:0,useCase:1},
        {name:`Plunder Box`,desc:`Steal an item`,cost:20,rarity:0,useCase:1},
        {name:`Restart Box`,desc:`Send another player to the start`,cost:25,rarity:0,useCase:1},

    ],minigame:[
        /*
        1: 1v1v1v1
        2: 2v2
        3: 1v3
        */
        {
            name:'Brownian Motion',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Punch with ACTION to stun opponents.
Don't get hit.
Get to 5 wins first.
`,
        },{
            name:'Awful Tower',player:1,
            desc:
`
Move with UP, LEFT, RIGHT.
Get to the top first.
`,
        },{
            name:`Bash n' Cash`,player:3,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
1: Don't get hit!
3: Punch with ACTION to take money.
`,
        },{
            name:`Gerrymandering`,player:1,
            desc:
`
Select with UP, DOWN, LEFT, RIGHT, ACTION.
Choose the largest area.
Get to 5 wins first.
`,
        },{
            name:`Touhou`,player:3,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
1: Attack with ACTION.
3: Don't get hit.
`,
        },{
            name:`Duckyball`,player:2,
            desc:
`
Move with UP, DOWN.
Score in the other team's goal.
Get to 5 wins first.
`,
        },{
            name:'Spiked Ducks',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Attack opponents from behind to defeat them.
Get to 5 wins first.
`,
        },{
            name:'Cookie Wheel',player:1,
            desc:
`
Press UP to choose 2 and DOWN to choose 1.
The wheel will rotate based on total selection.
Get to 10 cookies first.
`,
        },{
            name:'Cookie Piles',player:1,
            desc:
`
Select direction with UP, DOWN, LEFT, RIGHT.
Don't go to the same place as somebody else.
Get to 10 cookies first.
`,
        },{
            name:'Acid Rain',player:1,
            desc:
`
Move with UP, LEFT, RIGHT.
Don't get hit.
Get to 5 wins first.
`,
        },{
            name:'Vortex',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Punch with ACTION to knock back opponents.
Don't get hit.
Get to 5 wins first.
`,
        },{
            name:'Treadmill',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Punch with ACTION to stun opponents.
Don't get hit or fall off.
Get to 5 wins first.
`,
        },{
            name:'Maze Murder',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Shoot with ACTION to damage opponents.
Don't get hit.
Get to 5 wins first.
`,
        },{
            name:'Cookie Chaos',player:1,
            desc:
`
Press UP to choose 2 and DOWN to choose 1.
You'll receive that many cookies.
Don't get the spiky ball.
`,
        },{
            name:'Hidden Hunt',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Punch with ACTION to kill opponents.
Blend in with NPCs to avoid opponents.
If you punch an NPC you die.
Get to 5 wins first.
`,
        },{
            name:'Tank Ducks',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Shoot with ACTION to damage opponents.
Don't get hit.
Get to 5 wins first.
`,
        },{
            name:'Electric Maze',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Reach the end.
Get to 5 wins first.
`,
        },{
            name:'Overpopulation',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Get the ducks to the other players' zones.
`,
        },{
            name:'Toxic Tower',player:1,
            desc:
`
Move with UP, LEFT, RIGHT.
Attack with DOWN, ACTION to push opponents.
Get to the top first.
`,
        },{
            name:'Math Mania',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Go to the box with the correct answer.
Get to 5 wins first.
`,
        },{
            name:'Blackened Boxes',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Find the demanded numbered box.
Get to 5 wins first.
`,
        },{
            name:'Snowballers',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Press ACTION to build or release a ball.
Knock everyone else off.
Get to 5 wins first.
`,
        },{
            name:'Runner Ducks',player:1,
            desc:
`
Turn with LEFT, RIGHT. You can't stop moving forward.
Attack with ACTION to damage opponents.
Get to 5 wins first.
`,
        },{
            name:'Lemmings',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Don't get pushed off.
Get to 5 wins first.
`,
        },{
            name:'Stuffed Up',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Grab a cookie to grow big temporarily.
While big, overrun your opponents.
`,
        },{
            name:'The Bomber',player:1,
            desc:
`
Move with UP, LEFT, RIGHT.
Don't have the bomb when it detonates.
Get to 5 wins first.
`,
        },{
            name:'Blocked',player:1,
            desc:
`
Move cursor with UP, DOWN, LEFT, RIGHT.
Select with ACTION.
Each round, choose a block to drop.
Reach the top first to win.
`,
        },{
            name:'Duck in the Box',player:1,
            desc:
`
Jump with UP.
Hit the box on the duck to go up.
Reach the top first to win.
`,
        },{
            name:'Cookie Conveyor',player:1,
            desc:
`
Move with UP.
Collect the most cookies.
`,
        },{
            name:'Marble Mess',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Punch with ACTION to stun opponents.
Reach the end.
Get to 5 wins first.
`,
        },{
            name:'Fire At Will',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Punch with ACTION to stun opponents.
Don't get hit by the randomly targetted attacks.
Get to 5 wins first.
`,
        },{
            name:'Pie Production',player:2,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Interact or grab with ACTION.
Roll dough to produce crust.
Cook crust with filling to make pie.
Plate and serve cooked pie, then wash the plate.
Be the first to deliver 5 pies.
`,
        },
    ],
}
listing={
    minigame:[
        'Brownian Motion','Awful Tower','Gerrymandering','Duckyball','Spiked Ducks',
        'Cookie Wheel','Cookie Piles','Acid Rain','Vortex','Treadmill',
        'Maze Murder','Cookie Chaos','Hidden Hunt','Tank Ducks','Electric Maze',
        'Overpopulation','Toxic Tower','Math Mania','Blackened Boxes','Snowballers',
        'Runner Ducks','Lemmings','Stuffed Up','The Bomber','Blocked',
        'Duck in the Box','Cookie Conveyor','Marble Mess','Fire At Will','Pie Production',
    ],
}