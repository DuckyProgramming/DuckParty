stage={scene:`minigame`}
constants={trig:[[],[]],gravity:0.5}
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
    space:[
        {name:`Blank Space`},
        {name:`Blue Space`},
        {name:`Red Space`},
        {name:`Lucky Space`},
        {name:`Unlucky Space`},
        {name:`Event Space`},
        {name:`Stop Space`},
        {name:`Conducator Space`},
        {name:`Lucky Time Space`},
        {name:``},
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
    ],item:[
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
        {name:`Conducator Whistle`,desc:`Send any player to the Conducator`,cost:5,rarity:0,useCase:1},
        {name:`Robber Whistle`,desc:`Steal lumps or a bit`,cost:25,rarity:0,useCase:1},
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
`,
        },{
            name:'Awful Tower',player:1,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
Reach the top, and collect lumps.
`,
        },{
            name:`Bash n' Cash`,player:3,
            desc:
`
Move with UP, DOWN, LEFT, RIGHT.
1: Don't get hit!
3: Punch wtih ACTION to take money.
`,
        },
    ],
}