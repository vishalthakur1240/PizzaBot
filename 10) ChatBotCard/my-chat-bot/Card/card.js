const { CardFactory } = require('botbuilder');

module.exports = {
    welcomeCard: () => {
        return {
            attachments: [CardFactory.adaptiveCard({
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.3",
                "body": [
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "Image",
                                "url": "https://lh3.googleusercontent.com/proxy/q7B0KUbFay7iH6SgH5o8fnMWJi6G_JJWcPbvcOe_De5tS1ZJBh-aMEO0nJG15TpVy2Tf7F6CllK5LsUQXzCJDxnKVL69DfbFvnowpSECszKQ"
                            }
                        ]
                    },
                    {
                        "type": "TextBlock",
                        "text": "Hello I am your bot. I will help you in in Booking Tasty Pizzas. Type 'help' to know my all features. How may I help You?",
                        "wrap": true,
                        "size": "Medium",
                        "weight": "Bolder",
                        "color": "Accent"
                    }
                ]
            })]
        }
    },

    helpCard: () => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "data:image/jpeg;base64,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",
                                            "size": "Small"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Help",
                                            "wrap": true,
                                            "horizontalAlignment": "Center",
                                            "height": "stretch",
                                            "size": "ExtraLarge",
                                            "color": "Accent"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "From",
                                            "wrap": true,
                                            "horizontalAlignment": "Center",
                                            "size": "ExtraLarge",
                                            "color": "Accent"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Us",
                                            "wrap": true,
                                            "size": "ExtraLarge",
                                            "color": "Accent"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": "I can help with you Tasty PIZZA booking.",
                    "wrap": true,
                    "spacing": "Medium",
                    "separator": true,
                    "weight": "Bolder",
                    "color": "Good"
                },
                {
                    "type": "TextBlock",
                    "wrap": true,
                    "text": "You Just click on MENU Button or simply type \"menu\" on Chat."
                },
                {
                    "type": "TextBlock",
                    "text": "I Hope, it resolve your Query.",
                    "wrap": true
                }
            ]
        }
    },

    menuCard: () => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "size": "Small",
                                            "url": "data:image/jpeg;base64,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"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch"
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "MENU",
                                            "wrap": true,
                                            "size": "ExtraLarge",
                                            "color": "Dark",
                                            "weight": "Bolder",
                                            "fontType": "Default"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "https://www.dominos.co.in/files/items/Corn_&_Cheese.jpg",
                                            "separator": true
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "https://www.dominos.co.in/files/items/Peppy_Paneer.jpg"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "spacing": "Large",
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "CHEESE N CORN",
                                    "size": "ExtraLarge",
                                    "weight": "Bolder",
                                    "color": "Warning",
                                    "horizontalAlignment": "Center",
                                    "height": "stretch",
                                    "spacing": "None",
                                    "fontType": "Monospace",
                                    "wrap": true
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Peppy Paneer",
                                    "wrap": true,
                                    "height": "stretch",
                                    "fontType": "Monospace",
                                    "size": "ExtraLarge",
                                    "weight": "Bolder",
                                    "color": "Warning",
                                    "spacing": "Medium",
                                    "horizontalAlignment": "Center"
                                }
                            ]
                        }
                    ],
                    "separator": true,
                    "spacing": "Medium"
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": "https://www.dominos.co.in/files/items/Non-Veg_Supreme.jpg"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": "https://www.dominos.co.in/files/items/Chicken_Golden_Delight.jpg"
                                }
                            ]
                        }
                    ],
                    "separator": true,
                    "spacing": "Medium"
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Non Veg Supreme",
                                    "wrap": true,
                                    "horizontalAlignment": "Center",
                                    "height": "stretch",
                                    "fontType": "Monospace",
                                    "size": "ExtraLarge",
                                    "weight": "Bolder",
                                    "color": "Warning"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Chicken Golden Delight",
                                    "wrap": true,
                                    "horizontalAlignment": "Center",
                                    "height": "stretch",
                                    "fontType": "Monospace",
                                    "size": "ExtraLarge",
                                    "weight": "Bolder",
                                    "color": "Warning"
                                }
                            ]
                        }
                    ],
                    "separator": true,
                    "spacing": "Medium"
                }
            ]
        }
    },

    confirmPizza: (pizzaType, pizzaSize, pizzaQty) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "Image",
                                            "url": "https://celebaltech.com/assets/img/celebal.webp",
                                            "size": "Medium"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Leave Application",
                                            "wrap": true,
                                            "color": "Accent",
                                            "weight": "Bolder",
                                            "size": "Medium"
                                        }
                                    ],
                                    "backgroundImage": {
                                        "horizontalAlignment": "Center",
                                        "verticalAlignment": "Center"
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "separator": true,
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Type of Leave:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ],
                            "backgroundImage": {
                                "horizontalAlignment": "Center",
                                "verticalAlignment": "Center"
                            }
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${pizzaType}`,
                                    "wrap": true
                                }
                            ],
                            "backgroundImage": {
                                "horizontalAlignment": "Center",
                                "verticalAlignment": "Center"
                            }
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "separator": true,
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Number of Days:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ],
                            "backgroundImage": {
                                "horizontalAlignment": "Center",
                                "verticalAlignment": "Center"
                            }
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${pizzaSize}`,
                                    "wrap": true
                                }
                            ],
                            "backgroundImage": {
                                "horizontalAlignment": "Center",
                                "verticalAlignment": "Center"
                            }
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "separator": true,
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Leave Date: ",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ],
                            "backgroundImage": {
                                "horizontalAlignment": "Center",
                                "verticalAlignment": "Center"
                            }
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${pizzaQty}`,
                                    "wrap": true
                                }
                            ],
                            "backgroundImage": {
                                "horizontalAlignment": "Center",
                                "verticalAlignment": "Center"
                            }
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "wrap": true,
                    "text": "You have Ordered the Pizza. To know more about us, type \"about us\".",
                    "weight": "Bolder",
                    "color": "Good"
                }
            ]
        }
    }
}


















// {
//     "type": "Container",
//     "items": [
//         {
//             "type": "ColumnSet",
//             "columns": [
//                 {
//                     "type": "Column",
//                     "width": "stretch",
//                     "items": [
//                         {
//                             "type": "Image"
//                         }
//                     ]
//                 },
//                 {
//                     "type": "Column",
//                     "width": "stretch",
//                     "items": [
//                         {
//                             "type": "TextBlock",
//                             "text": "New TextBlock",
//                             "wrap": true
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// },
// {
//     "type": "ColumnSet",
//     "columns": [
//         {
//             "type": "Column",
//             "width": "stretch",
//             "items": [
//                 {
//                     "type": "Image"
//                 }
//             ]
//         },
//         {
//             "type": "Column",
//             "width": "stretch",
//             "items": [
//                 {
//                     "type": "TextBlock",
//                     "text": "New TextBlock",
//                     "wrap": true
//                 }
//             ]
//         }
//     ],
//     "separator": true
// },
// {
//     "type": "ColumnSet",
//     "columns": [
//         {
//             "type": "Column",
//             "width": "stretch",
//             "items": [
//                 {
//                     "type": "Image"
//                 }
//             ]
//         },
//         {
//             "type": "Column",
//             "width": "stretch",
//             "items": [
//                 {
//                     "type": "TextBlock",
//                     "text": "New TextBlock",
//                     "wrap": true
//                 }
//             ]
//         }
//     ],
//     "separator": true
// },
// {
//     "type": "ColumnSet",
//     "columns": [
//         {
//             "type": "Column",
//             "width": "stretch",
//             "items": [
//                 {
//                     "type": "Image"
//                 }
//             ]
//         },
//         {
//             "type": "Column",
//             "width": "stretch",
//             "items": [
//                 {
//                     "type": "TextBlock",
//                     "text": "New TextBlock",
//                     "wrap": true
//                 }
//             ]
//         }
//     ],
//     "separator": true
// }