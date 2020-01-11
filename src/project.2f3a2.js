require = function a(c, l, s) {
    function r(t, e) {
        if (!l[t]) {
            if (!c[t]) {
                var i = "function" == typeof require && require;
                if (!e && i)
                    return i(t, !0);
                if (h)
                    return h(t, !0);
                var n = new Error("Cannot find module '" + t + "'");
                throw n.code = "MODULE_NOT_FOUND",
                n
            }
            var o = l[t] = {
                exports: {}
            };
            c[t][0].call(o.exports, function(e) {
                return r(c[t][1][e] || e)
            }, o, o.exports, a, c, l, s)
        }
        return l[t].exports
    }
    for (var h = "function" == typeof require && require, e = 0; e < s.length; e++)
        r(s[e]);
    return r
}({
    AnimFunc: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "069bcLwjtNB/LYJrOEJbxa+", "AnimFunc"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            shake: function() {
                cc.log("helpBtnShake");
                var e = cc.rotateTo(.1, 15)
                  , t = cc.rotateTo(.1, 0)
                  , i = cc.rotateTo(.1, -15)
                  , n = cc.rotateTo(.12, 0)
                  , o = cc.repeat(cc.sequence(e, t, i, n), 3);
                this.node.stopAllActions(),
                this.node.runAction(o)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    DataAnalytics: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "ce5b7MEiDNGYJ4ofH92pKIH", "DataAnalytics");
        var n = {};
        n.init = function() {}
        ,
        n.login = function(e) {
            1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            3 < arguments.length && void 0 !== arguments[3] && arguments[3]
        }
        ,
        n.logout = function(e) {}
        ,
        n.createAPart = function(e) {
            e.gameServer = "platform" + cc.sys.platform
        }
        ,
        n.payBegin = function(e) {
            var t = Date.now().toString();
            e.payTime = t
        }
        ,
        n.paySuccess = function(e) {
            var t = Date.now().toString();
            e.payTime = t
        }
        ,
        n.levelBegin = function(e) {}
        ,
        n.levelResult = function(e, t) {
            console.log(t)
        }
        ,
        n.gameHideAndShow = function(e) {}
        ,
        n.doEvent = function(e) {}
        ,
        n.dealItem = function(e, t) {}
        ,
        t.exports = n,
        cc._RF.pop()
    }
    , {}],
    Enemy: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "cfe104AL1BA4ZYID8PM1eVV", "Enemy");
        e("./HexCell");
        cc.Class({
            extends: cc.Component,
            properties: {
                emeny: {
                    default: null,
                    type: cc.Node
                },
                _axialCoordinate: {
                    default: cc.v2(0, 0),
                    visible: !1
                },
                axialCoordinate: {
                    get: function() {
                        return this._axialCoordinate
                    },
                    set: function(e) {
                        this._axialCoordinate = cc.v2(e.x, e.y)
                    }
                }
            },
            onEnable: function() {
                this.schedule(this.check, .1)
            },
            onDisable: function() {
                this.unschedule(this.check)
            },
            onLoad: function() {},
            check: function() {
                if (cc.pDistance(gameView.myRole.node.getPosition(), this.node.getPosition()) <= 40) {
                    this.unschedule(this.check);
                    var e = {};
                    e.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                    e.reason = "被怪兽撞死",
                    gameApplication.DataAnalytics.levelResult(!1, e),
                    gameView.die()
                }
            },
            start: function() {},
            moveTo: function() {}
        }),
        cc._RF.pop()
    }
    , {
        "./HexCell": "HexCell"
    }],
    GameApplication: [function(e, t, i) {
        "use strict";
        var n;
        function o(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        cc._RF.push(t, "f08152UaoRPB64U7d0m5V+q", "GameApplication");
        e("../GameLogic/Player");
        var a = e("../GameLogic/SoundManager")
          , c = e("../SDK/DataAnalytics");
        e("../UI/MainView"),
        e("../UI/LevelView");
        cc.Class((o(n = {
            extends: cc.Component,
            properties: {
                soundManager: {
                    default: null,
                    type: a
                },
                missions: {
                    default: []
                },
                missionsCB: {
                    default: []
                },
                conf: {
                    default: {}
                },
                confCB: {
                    default: []
                },
                _playTimes: {
                    default: 0,
                    type: cc.Integer
                },
                playTimes: {
                    get: function() {
                        return this._playTimes
                    },
                    set: function(e) {
                        this._playTimes = e,
                        this._playTimes % playTimesAD == 0 && 1 != this._playTimes && (console.log("播放插屏广告"),
                        SDK().showInterstitialAd(function(e) {
                            e ? gameApplication.DataAnalytics.doEvent("播放插屏广告成功") : gameApplication.DataAnalytics.doEvent("播放插屏广告失败"),
                            console.log("播放Done")
                        }))
                    }
                },
                PopGameView: {
                    default: null,
                    type: cc.Node
                }
            },
            start: function() {
                e("LanguageData").init("en"),
                SDK().init(function() {
                    c.login(SDK().getInfo().id);
                    var e = {
                        level: "gameStart"
                    };
                    gameApplication.DataAnalytics.levelBegin(e)
                }
                .bind(this))
            },
            getConf: function(i, n) {
                null != this.conf[i] ? n && n(this.conf[i]) : cc.loader.loadRes(i, function(e, t) {
                    this.conf[i] = t,
                    null != n && n(t)
                }
                .bind(this))
            },
            onLoad: function() {
				this.autoAdapteScreen();
				
                window.gameApplication = this,
                window.gameFirst = !0,
                (this.DataAnalytics = c).init(),
                cc.game.addPersistRootNode(this.node),
                window.gameTimes = 1;
                var e = cc.director.getCollisionManager();
                e.enabled = !0,
                e.enabledDebugDraw = !1,
                e.enabledDrawBoundingBox = !1,
                cc.loader.loadRes("conf/missions", function(e, t) {
                    this.missions = t,
                    this.invokeMissionCB()
                }
                .bind(this)),
                this.openMainView(),
                SDK().getScore("playingMid", function(t) {
                    0 != t && null != t && null != t || (t = 1),
                    SDK().getScore("playingLid", function(e) {
                        0 != e && null != e && null != e || (e = 1),
                        window.bid = 1,
                        window.mid = t,
                        window.lid = e,
                        cc.director.loadScene("game")
                    }
                    .bind(this))
                }
                .bind(this)),
                cc.game.on(cc.game.EVENT_HIDE, function() {
                    c.gameHideAndShow(!0),
                    cc.audioEngine.pauseAll()
                }),
                cc.game.on(cc.game.EVENT_SHOW, function() {
                    c.gameHideAndShow(!1),
                    cc.audioEngine.resumeAll()
                })
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            onDestroy: function() {
                var e = {
                    level: "gameStart"
                };
                gameApplication.DataAnalytics.levelResult(!0, e),
                c.logout(SDK().getInfo().id)
            }
        }, "onDestroy", function() {
            cc.director.getCollisionManager().enabled = !1
        }),
        o(n, "getMissions", function(e) {
            null != this.missions && 0 < this.missions.length ? e(this.missions) : this.missionsCB.push(e)
        }),
        o(n, "invokeMissionCB", function() {
            var t = this;
            0 < this.missionsCB.length && this.missionsCB.forEach(function(e) {
                null != e && e(t.missions)
            })
        }),
        o(n, "setNodeActive", function(e, t) {
            cc.find("Canvas/" + e).active = t
        }),
        o(n, "openMainView", function() {
            this.setNodeActive("levelView", !1),
            this.setNodeActive("mainView", !0)
        }),
        o(n, "openLevelView", function(e, t) {
            this.setNodeActive("levelView", !0),
            this.setNodeActive("mainView", !1),
            cc.find("Canvas/levelView").getComponent("LevelView").init(e, t)
        }),
        o(n, "onQuitBtnClick", function() {}),
        o(n, "popClick", function(e, t) {
            SDK().switchGameAsync(t)
        }),
        n)),
        cc._RF.pop()
    }
    , {
        "../GameLogic/Player": "Player",
        "../GameLogic/SoundManager": "SoundManager",
        "../SDK/DataAnalytics": "DataAnalytics",
        "../UI/LevelView": "LevelView",
        "../UI/MainView": "MainView",
        LanguageData: "LanguageData"
    }],
    GameView: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "3a5f4xh9CRAI6wc4y+upnjw", "GameView");
        var S, _ = e("../../Utils/Utils"), B = e("./HexCell"), h = e("./Role"), l = e("./Enemy"), o = e("./Tower"), L = 100;
        cc.Class({
            extends: cc.Component,
            properties: {
                invAgain: {
                    default: null,
                    type: cc.Node
                },
                mission: {
                    default: null
                },
                gm: {
                    default: null,
                    type: cc.Node
                },
                title: {
                    default: null,
                    type: cc.Label
                },
                star1: {
                    default: null,
                    type: cc.Node
                },
                star2: {
                    default: null,
                    type: cc.Node
                },
                star3: {
                    default: null,
                    type: cc.Node
                },
                moves: {
                    default: null,
                    type: cc.RichText
                },
                best: {
                    default: null,
                    type: cc.RichText
                },
                tileBox: {
                    default: null,
                    type: cc.Node
                },
                iceBox: {
                    default: null,
                    type: cc.Node
                },
                maxValidMoves: {
                    default: 0,
                    type: cc.Integer
                },
                movesLeft: {
                    default: 0,
                    type: cc.Integer
                },
                moved: {
                    default: 0,
                    type: cc.Integer
                },
                levelDimensions: {
                    default: cc.v2(0, 0),
                    visible: !1
                },
                gridOffset: {
                    default: cc.v2(0, 0),
                    visible: !1
                },
                hexCellPrefab: {
                    default: null,
                    type: cc.Node
                },
                icePrefab: {
                    default: null,
                    type: cc.Node
                },
                rolePrefab: {
                    default: null,
                    type: cc.Node
                },
                enemyPrefab: {
                    default: null,
                    type: cc.Node
                },
                enemyPrefab1: {
                    default: null,
                    type: cc.Node
                },
                enemyPrefab2: {
                    default: null,
                    type: cc.Node
                },
                endPrefab: {
                    default: null,
                    type: cc.Node
                },
                allCells: {
                    default: [],
                    type: [B]
                },
                allTowers: {
                    default: [],
                    type: [o]
                },
                myRole: {
                    default: null,
                    type: h
                },
                enemys: {
                    default: []
                },
                helplines: {
                    default: []
                },
                endObj: {
                    default: null,
                    type: h
                },
                selectedLines: {
                    default: []
                },
                mouseIsDown: !1,
                userInputEnabled: !1,
                gameOver: !1,
                prevTilePosition: {
                    default: cc.v2(-1e3, -1e3),
                    visible: !1
                },
                mouseOffsetPos: {
                    default: cc.v2(0, 0),
                    visible: !1
                },
                touchPos: {
                    default: cc.v2(0, 0),
                    visible: !1
                },
                movePlus: {
                    get: function() {
                        return [cc.v2(0, 1), cc.v2(-1, 0), cc.v2(0, -1), cc.v2(1, 0)]
                    }
                },
                helpPath: {
                    default: []
                },
                helpShaked: {
                    default: []
                },
                helpBtn: {
                    default: null,
                    type: cc.Node
                },
                helpCountLabel: {
                    default: null,
                    type: cc.Label
                },
                _helpCount: {
                    default: 0,
                    type: cc.Integer
                },
                helpCount: {
                    get: function() {
                        return this._helpCount
                    },
                    set: function(e) {
                        this._helpCount = e,
                        this.helpCountLabel.string = e.toString();
                        var t = {};
                        t.my_help = 0 < this._helpCount ? this._helpCount : -1,
                        SDK().setScore(t, null),
                        this.helpBtn.getChildByName("icon").active = !0,
                        this.helpBtn.getChildByName("num").active = !0
                    }
                },
                timeHelpBtn: {
                    default: null,
                    type: cc.Node
                },
                timeHelpCountLabel: {
                    default: null,
                    type: cc.Label
                },
                _timeHelpCount: {
                    default: 0,
                    type: cc.Integer
                },
                timeHelpCount: {
                    get: function() {
                        return this._timeHelpCount
                    },
                    set: function(e) {
                        this._timeHelpCount = e,
                        this.timeHelpCountLabel.string = e.toString();
                        var t = {};
                        t.timeHelp = this._timeHelpCount,
                        SDK().setScore(t, null)
                    }
                },
                replayCountLabel: {
                    default: null,
                    type: cc.Label
                },
                _replayCount: {
                    default: 0,
                    type: cc.Integer
                },
                replayTimeCount: {
                    get: function() {
                        return this._replayCount
                    },
                    set: function(e) {
                        this.replayCount = e,
                        this.replayCountLabel.string = e.toString();
                        var t = {};
                        t.replayCount = this._timeHelpCount,
                        SDK().setScore(t, null)
                    }
                },
                watchVideoTip: {
                    default: null,
                    type: cc.Node
                },
                shareFriendTip: {
                    default: null,
                    type: cc.Node
                },
                preBtn: {
                    default: null,
                    type: cc.Node
                },
                nextBtn: {
                    default: null,
                    type: cc.Node
                },
                endView: {
                    default: null,
                    type: cc.Node
                },
                endView_nextBtn: {
                    default: null,
                    type: cc.Node
                },
                endView_backBtn: {
                    default: null,
                    type: cc.Node
                },
                endView_Stars: {
                    default: null,
                    type: cc.Node
                },
                endView_title: {
                    default: null,
                    type: cc.Label
                },
                endView_text: {
                    default: null,
                    type: cc.RichText
                },
                gameApplication: {
                    default: null,
                    type: Object
                },
                isMoving: !1,
                lastDirection: {
                    default: -1,
                    type: cc.Integer
                },
                turnBackCount: {
                    default: 0,
                    type: cc.Integer
                },
                timesNode: {
                    default: null,
                    type: cc.Node
                },
                timesVal: {
                    default: null,
                    type: cc.Label
                },
                timesLeft: {
                    default: 0,
                    type: cc.Integer
                },
                timeOutflowCB: {
                    default: null
                },
                timeIsUpNode: {
                    default: null,
                    type: cc.Node
                },
                timeIsUpInvNode: {
                    default: null,
                    type: cc.Node
                },
                timeIsUpEndNode: {
                    default: null,
                    type: cc.Node
                },
                gotMoreTime: !1,
                goShareView: {
                    default: null,
                    type: cc.Node
                },
                musicBtn: {
                    default: null,
                    type: cc.Sprite
                },
                menuView: {
                    default: null,
                    type: cc.Node
                },
                isMemu: {
                    default: !1,
                    visible: !1
                },
                musicOn: {
                    default: null,
                    type: cc.SpriteFrame
                },
                musicOff: {
                    default: null,
                    type: cc.SpriteFrame
                },
                guideView: {
                    default: null,
                    type: cc.Node
                }
            },
            checkMusic: function(e, t) {
                "turn" == t && (gameApplication.soundManager.isOpen ? gameApplication.soundManager.setIsOpen(!1) : gameApplication.soundManager.setIsOpen(!0)),
                gameApplication.soundManager.isOpen ? this.musicBtn.spriteFrame = this.musicOn : this.musicBtn.spriteFrame = this.musicOff
            },
            menuShow: function(e, t) {
                "1" == t ? (this.menuView.active = !0,
                this.isMemu = !0,
                gameApplication.PopGameView.active = !0) : "2" == t && (this.menuView.active = !1,
                this.isMemu = !1,
                gameApplication.PopGameView.active = !1)
            },
            onLoad: function() {
				this.autoAdapteScreen();
                window.gameView = this
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            plusMoreHelp: function() {
                this.helpCount += plusHelp
            },
            clearHelp: function() {
                this.helpCount = 0
            },
            onEnable: function() {
                SDK().getScore("timeHelp", function(e) {
                    this.timeHelpCount = e
                }
                .bind(this)),
                SDK().getScore("replayCount", function(e) {
                    this.replayTimeCount = e
                }
                .bind(this)),
                SDK().getScore("isFirst", function(e) {
                    0 == e || null == e || null == e ? SDK().setScore({
                        isFirst: 1
                    }) : window.gameFirst && (this.goShareView.active = !0,
                    window.gameFirst = !1)
                }
                .bind(this))
            },
            clearData: function() {
                SDK().clearData()
            },
            start: function() {
                var e = cc.find("GameApplication");
                null != e && (this.gameApplication = e.getComponent("GameApplication")),
                void 0 !== this.gameApplication && null != this.gameApplication ? (this.gm.active = SDK().isGM(),
                this.scheduleOnce(function() {
                    this.init()
                }, .2),
                this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                    this.onMouseDown(e)
                }, this),
                this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
                    this.onMouseMove(e)
                }, this)) : this.onBackBtnClicked()
            },
            clear: function() {
                this.unschedule(this.timeOutflow),
                this.clearTile(),
                this.allCells.splice(0, this.allCells.length),
                this.allTowers.splice(0, this.allTowers.length),
                this.selectedLines.splice(0, this.selectedLines.length),
                this.enemys.splice(0, this.enemys.length),
                this.helplines.splice(0, this.helplines.length),
                this.myRole = null,
                this.helpShaked.splice(0, this.helpShaked.length),
                null != this.helpPath && 0 < this.helpPath.length && this.helpPath.splice(0, this.helpPath.length),
                L = 100,
                this.mouseIsDown = !1,
                this.gameOver = !1,
                this.movesLeft = 0,
                this.moved = 0,
                this.turnBackCount = 0,
                this.lastDirection = -1,
                this.isMoving = !1,
                this.currentLineColor = 0,
                this.oldCurrentLineColor = 0
            },
            clearTile: function() {
                if (0 < this.tileBox.childrenCount)
                    for (var e = 0; e < this.tileBox.childrenCount; e++) {
                        null != (t = this.tileBox.children[e]) && (t.active = !1,
                        t.destroy())
                    }
                if (0 < this.iceBox.childrenCount)
                    for (e = 0; e < this.iceBox.childrenCount; e++) {
                        var t;
                        null != (t = this.iceBox.children[e]) && (t.active = !1,
                        t.destroy())
                    }
            },
            init: function() {
                var i = this;
                if (this.selectedLines = [],
                this.enemys = [],
                this.helplines = [],
                this.helpPath = [],
                this.myRole = null,
                this.isMoving = !1,
                this.endView.active = !1,
                this.timeIsUpNode.active = !1,
                this.gotMoreTime = !1,
                null != bid && 0 < bid && null != mid && 0 < mid && null != lid && 0 < lid) {
                    var e = "conf/level_detail/b_" + bid + "/" + mid + "/" + lid;
                    this.gameApplication.getConf(e, function(e) {
                        this.mission = e,
                        this.initGame()
                    }
                    .bind(this));
                    var t = [];
                    1 < lid && t.push(lid - 1),
                    lid < 100 && t.push(lid + 1),
                    t.forEach(function(e) {
                        var t = "conf/level_detail/b_" + bid + "/" + mid + "/" + e;
                        i.gameApplication.getConf(t, null)
                    }),
                    this.initHelpBtn()
                } else
                    this.onBackBtnClicked()
            },
            initHelpBtn: function() {
                var t = this;
                SDK().getScore("my_help", function(e) {
                    0 == e ? (t.helpCount = 5,
                    t.guideView.active = !0) : t.helpCount = -1 == e ? 0 : e
                }
                .bind(this))
            },
            initGame: function() {
                this.timeIsUpNode.active = !1,
                this.timeIsUpInvNode.active = !1,
                this.timeIsUpEndNode.active = !1,
                this.gotMoreTime = !1,
                this.endView.active = !1,
                this.clear();
                var e = this.mission.lines.length;
                this.maxValidMoves = e,
                this.movesLeft = e,
                this.moved = 0,
                this.turnBackCount = 0,
                this.helpShaked.splice(0, this.helpShaked.length),
                this.lastDirection = -1;
                var t = "conf/level_list/level_" + bid + "_" + mid;
                this.gameApplication.getConf(t, function(e) {
                    var t = e;
                    this.title.string = t.title + " " + lid
                }
                .bind(this)),
                this.moves.string = "0/" + e,
                SDK().getScore(bid + "_" + mid + "_" + lid + "_moves", function(e) {
                    this.best.string = e <= 0 ? "-" : e.toString()
                }
                .bind(this));
                var i = cc.v2(this.mission.x, this.mission.y);
                this.createGrid(i, this.mission.walls, this.mission.ice, this.mission.tower, function() {
                    this.scheduleOnce(function() {
                        var e = {};
                        e.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                        gameApplication.DataAnalytics.levelBegin(e),
                        this.isMemu = !0,
                        window.gameTimes = window.gameTimes + 1,
                        10 == window.gameTimes && (window.gameTimes = 0,
                        this.goShareView.active = !0);
                        var t = {};
                        if (t.playingMid = mid,
                        t.playingLid = lid,
                        SDK().setScore(t, null),
                        this.createRole(this.mission.start, this.mission.end),
                        0 < this.mission.enemy.length && this.createEnemy(this.mission.enemy),
                        this.initHelpPath(_.cloneObj(this.mission.lines)),
                        6 == mid) {
                            this.timeHelpBtn.active = !0;
                            var i = 12;
                            i = lid <= 5 ? 12 : lid <= 20 ? 15 : lid <= 45 ? 20 : lid <= 75 ? 25 : 30,
                            this.timesLeft = i,
                            this.timesNode.active = !0,
                            this.timesVal.string = i.toString();
                            var n = i + 1e4;
                            this.schedule(this.timeOutflow, 1, n, 1)
                        } else
                            this.timesLeft = -1,
                            this.timeHelpBtn.active = !1;
                        this.gameApplication.playTimes++
                    }
                    .bind(this), .5)
                }
                .bind(this)),
                this.updateUI()
            },
            initHelpPath: function(e) {
                if (2 != mid && 4 != mid && 6 != mid)
                    this.helpPath = e;
                else {
                    cc.log("_______________"),
                    this.helpPath = [],
                    this.helpPath.push(this.myRole.axialCoordinate);
                    for (var t = 0; 0 < e.length; ) {
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            if (null != n) {
                                n = this.checkXY(n, 0, 0);
                                for (var o = this.checkMovePos(n), a = 0; a < o.length; a++) {
                                    var c = this.helpPath[this.helpPath.length - 1];
                                    if (o[a].x == c.x && o[a].y == c.y) {
                                        this.helpPath.push(e[i]),
                                        e.splice(i, 1);
                                        break
                                    }
                                }
                            }
                        }
                        500 <= ++t && (e.splice(0, e.length),
                        e = [])
                    }
                }
            },
            getMoreTimeBtn: function() {
                0 < this.timeHelpCount ? (this.timesLeft = this.timesLeft + 5,
                this.timeHelpCount = this.timeHelpCount - 1) : this.timeIsUpNode.active = !0
            },
            timeOutflow: function() {
                var e = this;
                0 < this.timesLeft && (this.isMemu || this.timeIsUpNode.active || this.watchVideoTip.active || this.timesLeft--,
                this.timesLeft < 10 && 1 < this.timesLeft && this.schedule(function() {
                    e.gameApplication.soundManager.playSound("clock")
                }, .5, 2, 0),
                this.timesNode.active = !0,
                this.timesVal.string = this.timesLeft.toString(),
                this.timesLeft < 10 ? this.timesVal.node.color = cc.hexToColor("#ef3a40") : this.timesVal.node.color = cc.hexToColor("#ffffff"),
                0 == this.timesLeft && (this.gameOver = !0,
                this.timeIsUpEndNode.active = !0,
                e.unschedule(this.timeOutflow),
                this.stopAllAction()))
            },
            getMoreTime: function(t) {
                t.target.getComponent(cc.Button).interactable = !1;
                var i = this;
                gameApplication.DataAnalytics.doEvent("看视频获得更多时间"),
                SDK().showVideoAd(function(e) {
                    e ? (gameApplication.DataAnalytics.doEvent("播放视频广告成功"),
                    i.timeHelpCount = i.timeHelpCount + 5) : gameApplication.DataAnalytics.doEvent("播放视频广告失败"),
                    t.target.getComponent(cc.Button).interactable = !0,
                    i.timeIsUpNode.active = !1
                }
                .bind(this))
            },
            getMoreTimeInv: function(t) {
                var i = this;
                SDK().getScore("all", function(e) {
                    gameApplication.DataAnalytics.doEvent("分享获得更多时间"),
                    SDK().share(e, function(e) {
                        if (e) {
                            i.timesLeft = 10,
                            i.timesNode.active = !0,
                            i.timesVal.string = "10";
                            i.gotMoreTime = !0,
                            i.gameOver = !1,
                            i.unschedule(this.timeOutflow),
                            i.schedule(i.timeOutflow, 1, 10, 1)
                        } else
                            i.showInvAgain(3, t);
                        t.target.getComponent(cc.Button).interactable = !0,
                        i.timeIsUpInvNode.active = !1
                    }
                    .bind(this))
                }
                .bind(this))
            },
            restarGame: function(e) {
                this.myRole.node.stopAllActions(),
                this.unschedule(this.timeOutflow),
                this.timesVal.node.color = cc.hexToColor("#ffffff"),
                this.timeIsUpNode.active = !1,
                this.gotMoreTime = !1,
                this.endView.active = !1,
                this.selectedLines.splice(0, this.selectedLines.length),
                this.enemys.splice(0, this.enemys.length),
                this.helplines.splice(0, this.helplines.length),
                this.helpPath.splice(0, this.helpPath.length),
                this.helpShaked.splice(0, this.helpShaked.length),
                this.isMoving = !1,
                this.movesLeft = this.maxValidMoves,
                this.moved = 0,
                this.turnBackCount = 0,
                this.lastDirection = -1,
                null != e && 0 < e ? this.scheduleOnce(function() {
                    this.gameOver = !1,
                    this.myRole = null,
                    this.initGame()
                }, e) : (this.gameOver = !1,
                this.myRole = null,
                this.initGame())
            },
            nextGame: function() {
                lid < 100 ? (lid++,
                this.init()) : this.onBackBtnClicked()
            },
            prevGame: function() {
                1 < lid ? (lid--,
                this.init()) : this.onBackBtnClicked()
            },
            help: function() {
                if (!(this.gameOver || null == this.myRole || this.helpPath.length <= 0)) {
                    var e = null
                      , t = 0;
                    if (0 < this.selectedLines.length)
                        for (var i = this.helpPath.length - 1; 0 <= i; i--)
                            for (var n = this.checkXY(this.helpPath[i], 0, 0), o = cc.v2(n.x, n.y), a = this.selectedLines.length - 1; 0 <= a; a--) {
                                var c = this.selectedLines[a];
                                if (null == e && o.equals(c)) {
                                    e = o,
                                    t = i;
                                    break
                                }
                            }
                    null == e && (e = this.checkXY(this.helpPath[0], 0, 0),
                    t = 0),
                    this.showHelpLine(e, t)
                }
            },
            showHelpLine: function(e, t) {
                if (!(this.helpPath.length <= 0)) {
                    var i = this
                      , n = cc.v2(e.x, e.y);
                    0 < this.helplines.length && (n = this.helplines[this.helplines.length - 1]);
                    for (var o = 0; o < this.helpPath.length; o++) {
                        var a = this.helpPath[o];
                        if (n.equals(a)) {
                            n = cc.v2(a.x, a.y),
                            t = o;
                            break
                        }
                    }
                    t < this.helpPath.length - 1 && this.helpCount--,
                    this.helplines.length <= 0 && (!n.equals(this.myRole.axialCoordinate) && _.isNeighbors(n, this.myRole.axialCoordinate) && i.helplines.push(cc.v2(this.myRole.axialCoordinate.x, this.myRole.axialCoordinate.y)),
                    i.helplines.push(cc.v2(n.x, n.y)));
                    for (var c = !0; ++t < this.helpPath.length && c; ) {
                        e = this.checkXY(this.helpPath[t], 0, 0),
                        i.helplines.push(cc.v2(e.x, e.y));
                        var l = i.getCellByCoordinate(e);
                        2 < this.checkCanMoveCount(this.checkMove(e)) && 1 < i.helplines.length && i.helplines.length > i.selectedLines.length && !l.isIce && (c = !1)
                    }
                    if (1 < i.helplines.length)
                        for (o = 0; o < i.helplines.length; o++) {
                            var s = i.helplines[o];
                            l = i.getCellByCoordinate(s);
                            0 == o ? l.showStartHelp(i.helplines[o + 1]) : o == i.helplines.length - 1 ? l.showEndHelp(i.helplines[i.helplines.length - 2]) : l.showHelp(i.helplines[o - 1], i.helplines[o + 1])
                        }
                    var r = {
                        itemID: "提示",
                        itemType: "道具"
                    };
                    r.itemCount = plusHelp,
                    r.reason = "使用",
                    gameApplication.DataAnalytics.dealItem(2, r)
                }
            },
            update: function(e) {
                if (!this.gameOver) {
                    if (0 < this.enemys.length)
                        for (var t = 0; t < this.enemys.length; t++) {
                            var i = this.enemys[t];
                            this.roundMove(i)
                        }
                    if (0 < this.allTowers.length)
                        for (t = 0; t < this.allTowers.length; t++) {
                            var n = this.allTowers[t];
                            this.towerShoot(n)
                        }
                }
            },
            towerShoot: function(e) {
                if (!e.isShooting) {
                    e.isShooting = !0,
                    e.bubble.active = !0;
                    var t = this.checkMove(e.bubbleAxialCoordinate)
                      , i = -1;
                    if (-1 != e.direction && t[e.direction] && (i = e.direction),
                    -1 == i) {
                        var n = cc.callFunc(function() {
                            e.bubble.getComponent("NormalAnimation").play()
                        }, this)
                          , o = cc.delayTime(1)
                          , a = cc.callFunc(function() {
                            e.bubbleAxialCoordinate = e.axialCoordinate,
                            e.bubble.position = cc.pCompMult(e.node.getPosition(), cc.v2(.5, .5)),
                            e.bubble.opacity = 0
                        }, this)
                          , c = cc.delayTime(e.delay)
                          , l = cc.callFunc(function() {
                            e.isShooting = !1,
                            e.bubble.opacity = 255
                        }, this)
                          , s = cc.sequence(n, o, a, c, l);
                        e.bubble.runAction(s)
                    } else {
                        var r, h = e.bubbleAxialCoordinate.add(this.movePlus[i]), u = this.getCellByCoordinate(h), d = this.tileBox.convertToWorldSpaceAR(u.node.getPosition()), p = e.node.convertToNodeSpaceAR(d);
                        r = 1 == i ? cc.v2(-1 * p.y, -1 * p.x) : 2 == i ? cc.v2(-1 * p.x, -1 * p.y) : 3 == i ? cc.v2(p.y, p.x) : cc.v2(p.x, p.y);
                        var f = cc.moveTo(.3 * e.s, r.y, r.x);
                        n = cc.callFunc(function() {
                            e.bubbleAxialCoordinate = h,
                            e.isShooting = !1
                        }, this),
                        s = cc.sequence(f, n);
                        e.bubble.runAction(s)
                    }
                }
            },
            roundMove: function(e) {
                if (!e.isMoving) {
                    e.isMoving = !0;
                    var t = this.checkMove(e.axialCoordinate)
                      , i = -1;
                    if (-1 != e.direction && t[e.direction] && 1 == this.checkMoveDirectionCount(t, e.direction) || -1 != e.direction && t[e.direction] && .6 < Math.random())
                        i = e.direction;
                    else
                        for (; -1 == i; ) {
                            var n = _.GetRandomNum(0, 3);
                            t[n] && (i = n)
                        }
                    e.direction = i;
                    var o = e.axialCoordinate.add(this.movePlus[i])
                      , a = this.getCellByCoordinate(o).node.getPosition()
                      , c = cc.moveTo(1, a.x, a.y)
                      , l = cc.callFunc(function() {
                        e.axialCoordinate = o,
                        e.isMoving = !1
                    }, this)
                      , s = cc.sequence(c, l);
                    e.node.runAction(s)
                }
            },
            onMouseDown: function(e) {
                this.gameOver || null == this.myRole || (this.mouseIsDown = !0,
                this.touchPos = this.tileBox.convertToNodeSpaceAR(e.getLocation()))
            },
            onMouseMove: function(e) {
                if (!this.gameOver && null != this.myRole && this.mouseIsDown) {
                    var t = this.tileBox.convertToNodeSpaceAR(e.getLocation())
                      , i = t.x - this.touchPos.x
                      , n = t.y - this.touchPos.y;
                    if (Math.abs(i) < 30 && Math.abs(n) < 30)
                        return;
                    Math.abs(i) > Math.abs(n) ? i < 0 ? this.doAction(1, !0) : this.doAction(3, !0) : 0 < n ? this.doAction(0, !0) : this.doAction(2, !0),
                    this.mouseIsDown = !1
                }
            },
            getCellByCoordinate: function(e) {
                for (var t = 0; t < this.allCells.length; t++) {
                    var i = this.allCells[t];
                    if (i.axialCoordinate.equals(e))
                        return i
                }
                return null
            },
            stopAllAction: function() {
                cc.log("stopAllAction")
            },
            die: function() {
                this.unschedule(this.timeOutflow),
                this.gameOver = !0,
                this.myRole.playDie(),
                this.gameApplication.soundManager.playSound("error"),
                this.restarGame(2.1)
            },
            showGameOver: function() {
                this.guideView.active = !1;
                var e = {};
                e.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                e.reason = "过关",
                gameApplication.DataAnalytics.levelResult(!0, e),
                this.gameApplication.soundManager.playSound("gamewin"),
                this.unschedule(this.timeOutflow),
                this.timeIsUpInvNode.active = !1,
                this.timeIsUpNode.active = !1,
                this.watchVideoTip.active = !1;
                var i = this;
                this.gameOver = !0,
                this.endView.active = !0,
                this.stopAllAction();
                var t = 0;
                t = this.turnBackCount <= 0 ? 3 : this.turnBackCount <= 6 ? 2 : 1,
                this.endView_title.string = 3 == t ? "太棒啦" : 2 == t ? "厉害" : "一般",
                this.endView_text.string = "找到女朋友只用了 " + this.moved + " 步",
                SDK().getScore(bid + "_" + mid + "_" + lid, function(e) {
                    if (e < 1) {
                        var t = {};
                        t[bid + "_" + mid + "_" + lid] = 1,
                        SDK().setScore(t, null);
                        SDK().getScore("all", function(e) {
                            e += 1,
                            SDK().setScore({
                                all: e
                            }, null)
                        }
                        .bind(this)),
                        SDK().getScore(bid + "_" + mid, function(e) {
                            e += 1;
                            var t = {};
                            t[bid + "_" + mid] = e,
                            SDK().setScore(t, null)
                        }
                        .bind(this))
                    }
                }
                .bind(this)),
                SDK().getScore(bid + "_" + mid + "_" + lid + "_moves", function(e) {
                    if (i.moved < e || e <= 0) {
                        var t = {};
                        t[bid + "_" + mid + "_" + lid + "_moves"] = i.moved,
                        SDK().setScore(t, null)
                    }
                }
                .bind(this))
            },
            checkWin: function() {
                var e = this.myRole.axialCoordinate.equals(this.endObj.axialCoordinate);
                return e && this.showGameOver(),
                e
            },
            moveEnd: function() {
                if (this.isMoving = !1,
                !this.checkWin()) {
                    var e = this.checkMove();
                    this.gameApplication.soundManager.playSound("done"),
                    this.getCellByCoordinate(this.myRole.axialCoordinate).isIce && e[this.lastDirection] ? this.doAction(this.lastDirection, !0) : (this.moved++,
                    0 < this.turnBackCount && this.turnBackCount % 2 == 0 && !_.inArray(this.turnBackCount, this.helpShaked) && (this.helpBtnShake(),
                    this.helpShaked.push(this.turnBackCount)),
                    this.myRole.setArrow(e[0], e[1], e[2], e[3]))
                }
                this.updateUI()
            },
            addSelectedLines: function(e) {
                var n = this;
                if (2 <= this.selectedLines.length && e.equals(this.selectedLines[this.selectedLines.length - 2])) {
                    var t = this.selectedLines.pop();
                    this.getCellByCoordinate(t).hideLine()
                } else
                    this.selectedLines.push(cc.v2(e.x, e.y));
                1 < this.selectedLines.length && this.scheduleOnce(function() {
                    for (var e = 0; e <= n.selectedLines.length - 1; e++) {
                        var t = n.selectedLines[e];
                        (i = n.getCellByCoordinate(t)).hideLine()
                    }
                    for (e = 0; e <= n.selectedLines.length - 1; e++) {
                        t = n.selectedLines[e];
                        var i = n.getCellByCoordinate(t);
                        0 == e ? i.showStartLine(n.selectedLines[e + 1]) : e == n.selectedLines.length - 1 ? i.showEndLine(n.selectedLines[n.selectedLines.length - 2]) : i.showLine(n.selectedLines[e - 1], n.selectedLines[e + 1])
                    }
                }, .08)
            },
            doAction: function(e, t) {
                if (this.isMemu = !1,
                !this.isMoving && !this.gameOver) {
                    this.isMoving = !0,
                    this.myRole.hideArrow();
                    var i = this
                      , n = this.checkMove();
                    if (!t && 1 < this.checkMoveDirectionCount(n, e))
                        this.moveEnd();
                    else if (n[e]) {
                        var o = this.myRole.axialCoordinate.add(this.movePlus[e]);
                        if (null != (r = this.getCellByCoordinate(o))) {
                            (0 == e ? 2 == this.lastDirection : 3 == e ? 1 == this.lastDirection : 1 == e ? 3 == this.lastDirection : 0 == this.lastDirection) && this.turnBackCount++,
                            this.lastDirection = e;
                            var a = r.node.getPosition()
                              , c = cc.moveTo(.12, a.x, a.y)
                              , l = cc.callFunc(function() {
                                i.myRole.axialCoordinate = o,
                                i.isMoving = !1,
                                i.checkWin() || i.doAction(e, !1)
                            }, this);
                            this.addSelectedLines(o);
                            var s = cc.sequence(c, l);
                            i.myRole.node.runAction(s)
                        }
                    } else {
                        var r;
                        if (this.gameApplication.soundManager.playSound("done"),
                        1 == this.checkMoveDirectionCount(n, e)) {
                            if (e = this.getkMoveDirection(n, e),
                            !this.checkWin())
                                (r = this.getCellByCoordinate(this.myRole.axialCoordinate)).isIce ? this.moveEnd() : (this.isMoving = !1,
                                i.doAction(e, !0))
                        } else
                            this.moveEnd()
                    }
                }
            },
            getkMoveDirection: function(e, t) {
                var i;
                i = 0 == t ? 2 : 3 == t ? 1 : 1 == t ? 3 : 0;
                for (var n = 0; n < e.length; n++) {
                    if (e[n] && n != i)
                        return n
                }
            },
            checkCanMoveCount: function(e) {
                for (var t = 0, i = 0; i < e.length; i++) {
                    e[i] && t++
                }
                return t
            },
            checkMoveDirectionCount: function(e, t) {
                var i;
                i = 0 == t ? 2 : 3 == t ? 1 : 1 == t ? 3 : 0;
                for (var n = 0, o = 0; o < e.length; o++) {
                    e[o] && o != i && n++
                }
                return n
            },
            checkMove: function(e) {
                null == e && (e = this.myRole.axialCoordinate);
                var t = _.getNeighborsOBJ(e)
                  , i = !0
                  , n = !0
                  , o = !0
                  , a = !0
                  , c = this.getCellByCoordinate(e);
                if (null != c && (c.leftActive && (n = !1),
                c.rightActive && (a = !1),
                c.topActive && (i = !1),
                c.bottomActive && (o = !1)),
                i) {
                    var l = this.getCellByCoordinate(t.t);
                    null != l && l.bottomActive && (i = !1)
                }
                if (o) {
                    var s = this.getCellByCoordinate(t.b);
                    null != s && s.topActive && (o = !1)
                }
                if (n) {
                    var r = this.getCellByCoordinate(t.l);
                    null != r && r.rightActive && (n = !1)
                }
                if (a) {
                    var h = this.getCellByCoordinate(t.r);
                    null != h && h.leftActive && (a = !1)
                }
                return [i, n, o, a]
            },
            checkMovePos: function(e) {
                null == e && (e = this.myRole.axialCoordinate);
                var t = _.getNeighborsOBJ(e)
                  , i = t.t
                  , n = t.l
                  , o = t.b
                  , a = t.r
                  , c = this.getCellByCoordinate(e);
                if (null != c && (c.leftActive && (n = cc.v2(-1, -1)),
                c.rightActive && (a = cc.v2(-1, -1)),
                c.topActive && (i = cc.v2(-1, -1)),
                c.bottomActive && (o = cc.v2(-1, -1))),
                i) {
                    var l = this.getCellByCoordinate(t.t);
                    null != l && l.bottomActive && (i = cc.v2(-1, -1))
                }
                if (o) {
                    var s = this.getCellByCoordinate(t.b);
                    null != s && s.topActive && (o = cc.v2(-1, -1))
                }
                if (n) {
                    var r = this.getCellByCoordinate(t.l);
                    null != r && r.rightActive && (n = cc.v2(-1, -1))
                }
                if (a) {
                    var h = this.getCellByCoordinate(t.r);
                    null != h && h.leftActive && (a = cc.v2(-1, -1))
                }
                return [i, n, o, a]
            },
            createEnemy: function(e) {
                var t = L / 100;
                if (!(e.length <= 0))
                    for (var i = 0; i < e.length; i++) {
                        var n, o = e[i], a = this.getCellByCoordinate(cc.v2(o.x, o.y)), c = Math.random();
                        (n = c < .33 ? cc.instantiate(this.enemyPrefab) : c < .66 ? cc.instantiate(this.enemyPrefab1) : cc.instantiate(this.enemyPrefab2)).parent = this.tileBox,
                        n.setScale(t),
                        n.setPosition(a.node.getPosition()),
                        n.active = !0,
                        (o = n.getComponent(l)).axialCoordinate = a.axialCoordinate,
                        this.enemys.push(o)
                    }
            },
            createRole: function(e, t) {
                var i = L / 100;
                e = this.checkXY(e, 0, 0),
                t = this.checkXY(t, 0, 0);
                var n = this.getCellByCoordinate(cc.v2(e.x, e.y))
                  , o = this.getCellByCoordinate(cc.v2(t.x, t.y))
                  , a = cc.instantiate(this.rolePrefab);
                a.parent = this.tileBox,
                a.setScale(i),
                a.setPosition(n.node.getPosition()),
                a.active = !0;
                var c = a.getComponent(h);
                this.myRole = c,
                this.myRole.init(),
                this.myRole.axialCoordinate = n.axialCoordinate,
                this.selectedLines.push(cc.v2(n.axialCoordinate.x, n.axialCoordinate.y));
                var l = this.checkMove();
                this.myRole.setArrow(l[0], l[1], l[2], l[3]);
                var s = cc.instantiate(this.endPrefab);
                s.parent = this.tileBox,
                s.setScale(i),
                s.setPosition(o.node.getPosition()),
                s.active = !0;
                var r = (this.endNode = s).getComponent(h);
                this.endObj = r,
                this.endObj.axialCoordinate = o.axialCoordinate,
                (this.myRole.gameView = this).myRole.setDark(4 == mid)
            },
            collisionCallback: function() {
                this.die()
            },
            createGrid: function(e, t, r, h, u) {
                this.gridOffset.x = 0,
                this.gridOffset.y = 0;
                Math.max(e.x, e.y);
                var i = cc.director.getWinSize()
                  , n = this.tileBox.getContentSize()
                  , o = n.height
                  , a = i.width;
                if (o < (L = (a - (lineWidth - lineWidth * e.x)) / e.x) * e.y) {
                    var c = ((a = n.height) - (lineWidth - lineWidth * e.y)) / e.y;
                    c < L && (L = c,
                    this.gridOffset.x = .5 * (i.width - e.x * L + e.x * lineWidth))
                }
                var l, s = S = L;
                this.levelDimensions = e;
                var d = cc.v2(0, 0)
                  , p = cc.v2(0, 0)
                  , f = .5 * (n.height - this.levelDimensions.y * L + this.levelDimensions.y * lineWidth);
                this.gridOffset.y = -1 * n.height + f;
                for (var g = 0; g < this.levelDimensions.x; g++)
                    for (var m = 0; m < this.levelDimensions.y; m++) {
                        d.x = g,
                        d.y = m,
                        (p = _.axialToScreen(d, S)).x += this.gridOffset.x,
                        p.y += this.gridOffset.y,
                        (l = cc.instantiate(this.hexCellPrefab)).parent = this.tileBox,
                        l.setPosition(p.add(cc.v2(0, 1e3))),
                        l.setContentSize(cc.size(s, s)),
                        l.active = !0;
                        var v = this;
                        m % 2 == 0 ? l.runAction(cc.sequence(cc.moveTo(.2 + .05 * d.y, p.x, p.y), cc.callFunc(function() {
                            v.gameApplication.soundManager.playSound("uplock")
                        }))) : l.runAction(cc.moveTo(.2 + .05 * d.y, p.x, p.y)),
                        l.name = "grid" + g.toString() + "_" + m.toString(),
                        l.zIndex = 0,
                        (b = l.getComponent(B)).scaleChild(s / 100, s / 100),
                        b.axialCoordinate = d,
                        this.allCells.push(b)
                    }
                if (!(null == t || t.length <= 0)) {
                    for (v = this,
                    g = 0; g < t.length; g++) {
                        var y, C, b, w = t[g], A = v.checkXY(w.w1, 0, 0), x = v.checkXY(w.d1, 0, 0);
                        A.x < x.x || A.y > x.y ? (y = A,
                        C = x) : (y = x,
                        C = A),
                        (b = this.getCellByCoordinate(cc.v2(y.x, y.y - 1))) ? y.x == C.x ? b.setLeft(!0) : b.setTop(!0) : (b = this.getCellByCoordinate(cc.v2(y.x, y.y))) ? y.x == C.x ? b.setRight(!0) : b.setBottom(!0) : (b = this.getCellByCoordinate(cc.v2(y.x - 1, y.y - 1))) && (y.x == C.x ? b.setRight(!0) : b.setBottom(!0))
                    }
                    this.scheduleOnce(function() {
                        if (null != r && 0 < r.length)
                            for (var e = 0; e < r.length; e++) {
                                var t = r[e];
                                if (null != (s = this.getCellByCoordinate(cc.v2(t.x, t.y)))) {
                                    s.setIce(!0);
                                    var i = cc.instantiate(this.icePrefab);
                                    i.parent = this.iceBox,
                                    i.setPosition(s.node.getPosition()),
                                    i.setContentSize(s.node.getContentSize()),
                                    i.active = !0,
                                    i.setScale(.3, .3),
                                    i.runAction(cc.scaleTo(.35, 1, 1))
                                }
                            }
                        if (null != h && 0 < h.length)
                            for (e = 0; e < h.length; e++) {
                                var n, o, a = h[e], c = v.checkXY(a.w1, 0, 0), l = v.checkXY(a.d1, 0, 0), s = null;
                                c.x < l.x || c.y > l.y ? (n = c,
                                o = l) : (n = l,
                                o = c),
                                1 == a.direction ? null == (s = this.getCellByCoordinate(cc.v2(Math.max(n.x, o.x) - 1, o.y))) && (s = this.getCellByCoordinate(cc.v2(Math.max(n.x, o.x), o.y))) : 3 == a.direction ? null == (s = this.getCellByCoordinate(cc.v2(Math.max(n.x, o.x), o.y))) && (s = this.getCellByCoordinate(cc.v2(Math.max(n.x, o.x) - 1, o.y))) : 0 == a.direction ? null == (s = this.getCellByCoordinate(cc.v2(n.x, Math.min(n.y, o.y)))) && (s = this.getCellByCoordinate(cc.v2(n.x, Math.max(n.y, o.y)))) : 2 == a.direction && null == (s = this.getCellByCoordinate(cc.v2(n.x, Math.max(n.y, o.y) - 1))) && (s = this.getCellByCoordinate(cc.v2(n.x, Math.max(n.y, o.y)))),
                                null != s && (n.x == o.x ? 1 == a.direction ? (s.setRightTower(!0),
                                this.pushTower(s.rightTower, s.axialCoordinate, a)) : (s.setLeftTower(!0),
                                this.pushTower(s.leftTower, s.axialCoordinate, a)) : 0 == a.direction ? (s.setTopTower(!0),
                                this.pushTower(s.topTower, s.axialCoordinate, a)) : (s.setBottomTower(!0),
                                this.pushTower(s.bottomTower, s.axialCoordinate, a)),
                                s.node.zIndex = 1)
                            }
                        u && u()
                    }
                    .bind(this), .5 + .05 * this.levelDimensions.y)
                }
            },
            pushTower: function(e, t, i) {
                var n = e.getComponent(o);
                n.axialCoordinate = t,
                n.init(i),
                this.allTowers.push(n)
            },
            checkXY: function(e, t, i) {
                return null == e.x && (e.x = i),
                null == e.y && (e.y = t),
                e
            },
            updateUI: function() {
                this.moved > this.maxValidMoves ? this.moves.string = "<color=#ff0000>" + this.moved + "</c>/" + this.maxValidMoves : this.moves.string = this.moved + "/" + this.maxValidMoves
            },
            setStar: function(e, t, i) {},
            onBackBtnClicked: function(e) {
                (null != this.gameApplication && this.gameApplication.soundManager.playSound("btn_click"),
                null != e) && (e.target.getComponent(cc.Button).interactable = !1);
                var t = {};
                t.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                t.reason = "失败",
                gameApplication.DataAnalytics.levelResult(!1, t),
                gameApplication.PopGameView.active = !1,
                cc.director.loadScene("main")
            },
            onNextBtnClicked: function(e, t) {
                var i = e.target.getComponent(cc.Button);
                if (i.interactable = !1,
                this.scheduleOnce(function() {
                    i.interactable = !0
                }, 1),
                "pass" != t) {
                    var n = {};
                    n.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                    n.reason = "进入下一关",
                    gameApplication.DataAnalytics.levelResult(!1, n)
                }
                this.gameApplication.soundManager.playSound("btn_click"),
                this.nextGame(i)
            },
            onPreviousBtnClicked: function(e) {
                var t = e.target.getComponent(cc.Button);
                t.interactable = !1,
                this.scheduleOnce(function() {
                    t.interactable = !0
                }, 1);
                var i = {};
                i.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                i.reason = "点击上一关按钮",
                gameApplication.DataAnalytics.levelResult(!1, i),
                this.gameApplication.soundManager.playSound("btn_click"),
                this.prevGame()
            },
            onReStarBtnClicked: function(e, t) {
                var i = e.target.getComponent(cc.Button);
                i.interactable = !1,
                this.scheduleOnce(function() {
                    i.interactable = !0
                }, 1);
                var n = {};
                n.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                n.reason = "点击重玩按钮",
                "1" == t && (n.reason = "时间不够"),
                gameApplication.DataAnalytics.levelResult(!1, n),
                this.gameApplication.soundManager.playSound("btn_click"),
                this.restarGame()
            },
            onHelpBtnClicked: function(e) {
                this.gameOver || null == this.myRole || this.helpPath.length <= 0 || (0 < this.helpCount ? (this.gameApplication.soundManager.playSound("btn_click"),
                this.help()) : (this.gameApplication.soundManager.playSound("btn_click"),
                this.watchVideoTip.active = !0))
            },
            onWatchVideoBtnClicked: function(i) {
                this.gameApplication.soundManager.playSound("btn_click"),
                i.target.getComponent(cc.Button).interactable = !1;
                var n = this;
                SDK().showVideoAd(function(e) {
                    if (e) {
                        n.helpCount = plusHelp,
                        gameApplication.DataAnalytics.doEvent("播放视频广告成功");
                        var t = {
                            itemID: "提示",
                            itemType: "道具"
                        };
                        t.itemCount = plusHelp,
                        t.reason = "看视频获得",
                        gameApplication.DataAnalytics.dealItem(1, t)
                    } else
                        cc.log("播放视频广告失败"),
                        gameApplication.DataAnalytics.doEvent("播放视频广告失败");
                    i.target.getComponent(cc.Button).interactable = !0,
                    n.watchVideoTip.active = !1,
                    n.shareFriendTip.active = !1
                }
                .bind(this))
            },
            onShareInvBtnClicked: function(i) {
                this.gameApplication.soundManager.playSound("btn_click");
                var n = this;
                this.gameApplication.soundManager.playSound("done"),
                SDK().getScore("all", function(e) {
                    SDK().share(e, function(e) {
                        if (e) {
                            n.helpCount = plusHelp,
                            console.log("邀请成功");
                            var t = {
                                itemID: "提示",
                                itemType: "道具"
                            };
                            t.itemCount = plusHelp,
                            t.reason = "分享获得",
                            gameApplication.DataAnalytics.dealItem(1, t)
                        } else
                            console.log("邀请失败"),
                            gameApplication.DataAnalytics.doEvent("分享失败"),
                            n.showInvAgain(1, i);
                        i.target.getComponent(cc.Button).interactable = !0,
                        n.watchVideoTip.active = !1,
                        n.shareFriendTip.active = !1
                    })
                }
                .bind(this))
            },
            showInvAgain: function(e, t) {
                var i = this;
                this.invAgain.active = !0,
                cc.find("box/btn_4", this.invAgain).getComponent(cc.Button).node.on("click", function() {
                    1 == e ? i.onShareInvBtnClicked(t) : 2 == e ? i.onShareBtnClicked(t) : 3 == e && i.getMoreTimeInv(t),
                    i.invAgain.active = !1
                }, this)
            },
            onCloseWatchVideoTipClicked: function() {
                this.gameApplication.soundManager.playSound("btn_click"),
                this.watchVideoTip.active = !1,
                this.shareFriendTip.active = !1
            },
            onShareBtnClicked: function(t, e) {
                var i = this;
                this.gameApplication.soundManager.playSound("btn_click"),
                t.target.getComponent(cc.Button).interactable = !1,
                t.target.active = !0,
                this.gameApplication.soundManager.playSound("done"),
                SDK().getScore("all", function(e) {
                    SDK().share(e, function(e) {
                        t.target.getComponent(cc.Button).interactable = !0,
                        t.target.active = !0,
                        e ? gameApplication.DataAnalytics.doEvent("分享成功") : (gameApplication.DataAnalytics.doEvent("分享失败"),
                        i.showInvAgain(2, t))
                    })
                }
                .bind(this))
            },
            goShare: function() {
                this.goShareView.active = !1,
                SDK().getScore("all", function(e) {
                    SDK().share(e, null)
                }
                .bind(this))
            },
            helpBtnShake: function() {
                this.helpBtn.getComponent("AnimFunc").shake()
            }
        }),
        cc._RF.pop()
    }
    , {
        "../../Utils/Utils": "Utils",
        "./Enemy": "Enemy",
        "./HexCell": "HexCell",
        "./Role": "Role",
        "./Tower": "Tower"
    }],
    HexCell: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9f2d9wJS0FLXJ2cTn40JI4b", "HexCell"),
        cc.Class({
            extends: cc.Component,
            properties: {
                help_end: {
                    default: null,
                    type: cc.Node
                },
                help_start: {
                    default: null,
                    type: cc.Node
                },
                line_end: {
                    default: null,
                    type: cc.Node
                },
                line_start: {
                    default: null,
                    type: cc.Node
                },
                _axialCoordinate: {
                    default: cc.v2(0, 0),
                    visible: !1
                },
                axialCoordinate: {
                    get: function() {
                        return this._axialCoordinate
                    },
                    set: function(e) {
                        this._axialCoordinate = cc.v2(e.x, e.y),
                        this.onUpdateAxialCoordinate()
                    }
                },
                iceNode: {
                    default: null,
                    type: cc.Node
                },
                isIce: {
                    get: function() {
                        return this.iceNode.active
                    }
                },
                leftTower: {
                    default: null,
                    type: cc.Node
                },
                rightTower: {
                    default: null,
                    type: cc.Node
                },
                bottomTower: {
                    default: null,
                    type: cc.Node
                },
                topTower: {
                    default: null,
                    type: cc.Node
                },
                hasTower: {
                    get: function() {
                        return this.leftTower.active || this.rightTower.active || this.bottomTower.active || this.topTower.active
                    }
                },
                coordinateText: {
                    default: null,
                    type: cc.Label
                },
                left: {
                    default: null,
                    type: cc.Node
                },
                right: {
                    default: null,
                    type: cc.Node
                },
                top: {
                    default: null,
                    type: cc.Node
                },
                bottom: {
                    default: null,
                    type: cc.Node
                },
                leftActive: {
                    get: function() {
                        return this.left.active
                    }
                },
                rightActive: {
                    get: function() {
                        return this.right.active
                    }
                },
                topActive: {
                    get: function() {
                        return this.top.active
                    }
                },
                bottomActive: {
                    get: function() {
                        return this.bottom.active
                    }
                }
            },
            onLoad: function() {
                this.initHexcell()
            },
            start: function() {},
            scaleChild: function(e, t) {
                this.line_end.setScale(e, t),
                this.line_start.setScale(e, t),
                this.help_end.setScale(e, t),
                this.help_start.setScale(e, t),
                this.leftTower.getComponent("Tower").setScaleXY(e, t),
                this.topTower.getComponent("Tower").setScaleXY(e, t),
                this.rightTower.getComponent("Tower").setScaleXY(e, t),
                this.bottomTower.getComponent("Tower").setScaleXY(e, t)
            },
            showStartLine: function(e) {
                null != e && (this.line_start.active = !0,
                this.axialCoordinate.x == e.x ? this.axialCoordinate.y > e.y ? this.line_start.setRotation(90) : this.line_start.setRotation(-90) : this.axialCoordinate.x > e.x ? this.line_start.setRotation(180) : this.line_start.setRotation(0))
            },
            showEndLine: function(e) {
                null != e && (this.line_end.active = !0,
                this.axialCoordinate.x == e.x ? this.axialCoordinate.y > e.y ? this.line_end.setRotation(90) : this.line_end.setRotation(-90) : this.axialCoordinate.x > e.x ? this.line_end.setRotation(180) : this.line_end.setRotation(0))
            },
            showLine: function(e, t) {
                this.showStartLine(t),
                this.showEndLine(e)
            },
            hideLine: function() {
                this.line_start.active = !1,
                this.line_end.active = !1
            },
            showStartHelp: function(e) {
                null != e && (this.help_start.active = !0,
                this.axialCoordinate.x == e.x ? this.axialCoordinate.y > e.y ? this.help_start.setRotation(90) : this.help_start.setRotation(-90) : this.axialCoordinate.x > e.x ? this.help_start.setRotation(180) : this.help_start.setRotation(0))
            },
            showEndHelp: function(e) {
                null != e && (this.help_end.active = !0,
                this.axialCoordinate.x == e.x ? this.axialCoordinate.y > e.y ? this.help_end.setRotation(90) : this.help_end.setRotation(-90) : this.axialCoordinate.x > e.x ? this.help_end.setRotation(180) : this.help_end.setRotation(0))
            },
            showHelp: function(e, t) {
                this.showStartHelp(t),
                this.showEndHelp(e)
            },
            hideHelpLine: function() {
                this.help_start.active = !1,
                this.help_end.active = !1
            },
            setIce: function(e) {
                this.iceNode.active = !0
            },
            setLeft: function(e) {
                this.left.active = e
            },
            setRight: function(e) {
                this.right.active = e
            },
            setTop: function(e) {
                this.top.active = e
            },
            setBottom: function(e) {
                this.bottom.active = e
            },
            setLeftTower: function(e) {
                this.leftTower.active = e
            },
            setRightTower: function(e) {
                this.rightTower.active = e
            },
            setTopTower: function(e) {
                this.topTower.active = e
            },
            setBottomTower: function(e) {
                this.bottomTower.active = e
            },
            initHexcell: function() {
                this.reset()
            },
            onUpdateAxialCoordinate: function() {
                this.coordinateText.string = parseInt(this.axialCoordinate.x) + "," + parseInt(this.axialCoordinate.y),
                this.coordinateText.node.active = isDebug
            },
            reset: function(e) {
                e = !!arguments[0] && arguments[0];
                this.setLeft(!1),
                this.setRight(!1),
                this.setTop(!1),
                this.setBottom(!1),
                this.setLeftTower(!1),
                this.setRightTower(!1),
                this.setTopTower(!1),
                this.setBottomTower(!1)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    LanguageData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
        var n = e("polyglot.min")
          , o = null;
        function a(e) {
            return window.i18n.languages[e]
        }
        function c(e) {
            e && (o ? o.replace(e) : o = new n({
                phrases: e,
                allowMissing: !0
            }))
        }
        window.i18n || (window.i18n = {
            languages: {},
            curLang: ""
        }),
        t.exports = {
            init: function(e) {
                if (e !== window.i18n.curLang) {
                    var t = a(e) || {};
                    window.i18n.curLang = e,
                    c(t),
                    this.inst = o
                }
            },
            t: function(e, t) {
                if (o)
                    return o.t(e, t)
            },
            inst: o,
            updateSceneRenderers: function() {
                for (var e = cc.director.getScene().children, t = [], i = 0; i < e.length; ++i) {
                    var n = e[i].getComponentsInChildren("LocalizedLabel");
                    Array.prototype.push.apply(t, n)
                }
                for (var o = 0; o < t.length; ++o) {
                    t[o].updateLabel()
                }
                for (var a = [], c = 0; c < e.length; ++c) {
                    var l = e[c].getComponentsInChildren("LocalizedSprite");
                    Array.prototype.push.apply(a, l)
                }
                for (var s = 0; s < a.length; ++s) {
                    a[s].updateSprite(window.i18n.curLang)
                }
            }
        },
        cc._RF.pop()
    }
    , {
        "polyglot.min": "polyglot.min"
    }],
    LevelView: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f23f1EV0cJDq6BQzHk3MAdR", "LevelView"),
        cc.Class({
            extends: cc.Component,
            properties: {
                title: {
                    default: null,
                    type: cc.Label
                },
                starts: {
                    default: null,
                    type: cc.Node
                },
                pageView: {
                    default: null,
                    type: cc.PageView
                },
                content: {
                    default: null,
                    type: cc.Node
                },
                levelItem: {
                    default: null,
                    type: cc.Node
                },
                levelPage: {
                    default: null,
                    type: cc.Node
                },
                levels: {
                    default: {}
                },
                bid: {
                    default: 0,
                    type: cc.Integer
                },
                mid: {
                    default: 0,
                    type: cc.Integer
                },
                _lastOpenLid: {
                    default: 0,
                    type: cc.Integer
                },
                lastOpenLid: {
                    get: function() {
                        return this._lastOpenLid
                    },
                    set: function(e) {
                        this._lastOpenLid = e,
                        this.updateCurrpage()
                    }
                },
                gameApplication: {
                    default: null,
                    type: Object
                },
                lastLid: {
                    default: 0,
                    type: cc.Integer
                }
            },
            onLoad: function() {
				this.autoAdapteScreen();
                this.gameApplication = cc.find("GameApplication").getComponent("GameApplication")
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            start: function() {},
            init: function(n, o) {
                if (this.title.string = "",
                null == this.levels || Object.keys(this.levels).length <= 0 || this.bid != n || this.mid != o) {
                    this.bid = n,
                    this.mid = o;
                    var e = "conf/level_list/level_" + n + "_" + o;
                    this.gameApplication.getConf(e, function(e) {
                        this.levels = e,
                        this.initContents()
                    }
                    .bind(this))
                } else
                    this.bid = n,
                    this.mid = o,
                    this.initContents();
                var a = this;
                SDK().getScore(n + "_" + o, function(e) {
                    a.starts.getComponent(cc.Label).string = e.toString();
                    var t = e + 1
                      , i = [];
                    i.push(t),
                    1 < t && i.push(t - 1),
                    i.forEach(function(e) {
                        var t = "conf/level_detail/b_" + n + "/" + o + "/" + e;
                        a.gameApplication.getConf(t, null)
                    })
                }
                .bind(this))
            },
            initContents: function() {
                var t = this;
                t.hideAllItem(),
                this.title.string = t.levels.title,
                this.lastLid = 0,
                this.bid = t.levels.bid,
                this.mid = t.levels.mid;
                var i = 1;
                t.levels.levels.forEach(function(e) {
                    t.initLevels(e, i),
                    i++
                }),
                this.pageView._updatePageView()
            },
            initLevels: function(e, t) {
                if (!(t < 1 || 4 < t)) {
                    var i = cc.instantiate(this.levelPage);
                    i.active = !0,
                    this.pageView.addPage(i);
                    for (var n = i.getChildByName("content"), o = (e.total_level,
                    1); o <= 25; o++) {
                        var a = o.toString()
                          , c = n.getChildByName(a);
                        if (o > e.total_level)
                            c.active = !1;
                        else {
                            var l = 25 * (t - 1) + o;
                            c.tag = l,
                            this.setItem(c, 0, !1, l);
                            var s = this;
                            SDK().getScore(s.bid + "_" + s.mid + "_" + l, function(e, t, i) {
                                var n = !1;
                                i <= s.lastLid + 1 || 0 < e ? (n = !0,
                                s.setItem(t, e, n, i)) : openAllLevel && s.setItem(t, e, !0, i),
                                0 < e && (s.lastLid = i)
                            }, c, l)
                        }
                    }
                }
            },
            setItem: function(e, t, i, n) {
                cc.find("unlock", e).active = i,
                cc.find("lock", e).active = !i,
                cc.find("unlock/text", e).getComponent(cc.Label).string = n,
                cc.find("lock/text", e).getComponent(cc.Label).string = n,
                e.active = !0,
                i && (this.lastOpenLid = n)
            },
            updateCurrpage: function() {
                var e = Math.ceil(this.lastOpenLid / 30) - 1;
                e = 0 <= e ? e : 0,
                this.pageView.scrollToPage(e, !1)
            },
            onLevelItemClicked: function(e) {
                this.gameApplication.soundManager.playSound("btn_click");
                var t = e.target
                  , i = t.getComponent(cc.Button);
                i.interactable = !1;
                var n = parseInt(t.tag);
                n < 1 || n > this.lastOpenLid ? i.interactable = !0 : (window.bid = this.bid,
                window.mid = this.mid,
                window.lid = n,
                cc.director.loadScene("game"))
            },
            hideAllItem: function() {
                this.pageView.removeAllPages()
            },
            onBackBtnClicked: function() {
                this.hideAllItem(),
                this.gameApplication.openMainView(),
                this.gameApplication.soundManager.playSound("btn_click")
            }
        }),
        cc._RF.pop()
    }
    , {}],
    LoadingView: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "961c4S3IrNHB4M+zHyOMk6f", "LoadingView"),
        cc.Class({
            extends: cc.Component,
            properties: {
                gameApplication: {
                    default: null,
                    type: Object
                }
            },
            onLoad: function() {
				this.autoAdapteScreen();
                this.gameApplication = cc.find("GameApplication").getComponent("GameApplication")
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            start: function() {
                "undefined" != typeof bid && "undefined" != typeof mid && "undefined" != typeof lid && this.gameApplication.openLevelView(bid, mid)
            },
            onPlayBtnClicked: function() {
                cc.log("onPlayBtnClicked"),
                this.gameApplication.openMainView(),
                this.gameApplication.soundManager.playSound("btn_click")
            }
        }),
        cc._RF.pop()
    }
    , {}],
    LocalizedLabel: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
        var n = e("LanguageData");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                menu: "i18n/LocalizedLabel"
            },
            properties: {
                dataID: {
                    get: function() {
                        return this._dataID
                    },
                    set: function(e) {
                        this._dataID !== e && (this._dataID = e,
                        this.updateLabel())
                    }
                },
                _dataID: ""
            },
            onLoad: function() {
                n.inst || n.init(),
                this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Label);
                if (e)
                    return this.label = e,
                    void this.updateLabel()
            },
            updateLabel: function() {
                this.label ? n.t(this.dataID) && (this.label.string = n.t(this.dataID)) : cc.error("Failed to update localized label, label component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        LanguageData: "LanguageData"
    }],
    LocalizedSprite: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
        var n = e("SpriteFrameSet");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                inspector: "packages://i18n/inspector/localized-sprite.js",
                menu: "i18n/LocalizedSprite"
            },
            properties: {
                spriteFrameSet: {
                    default: [],
                    type: n
                }
            },
            onLoad: function() {
                this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Sprite);
                if (e)
                    return this.sprite = e,
                    void this.updateSprite(window.i18n.curLang)
            },
            getSpriteFrameByLang: function(e) {
                for (var t = 0; t < this.spriteFrameSet.length; ++t)
                    if (this.spriteFrameSet[t].language === e)
                        return this.spriteFrameSet[t].spriteFrame
            },
            updateSprite: function(e) {
                if (this.sprite) {
                    var t = this.getSpriteFrameByLang(e);
                    !t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame),
                    this.sprite.spriteFrame = t
                } else
                    cc.error("Failed to update localized sprite, sprite component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        SpriteFrameSet: "SpriteFrameSet"
    }],
    MainView: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5a326YqAwhD+IfA3lH1oKVk", "MainView"),
        cc.Class({
            extends: cc.Component,
            properties: {
                noAdsView: {
                    default: null,
                    type: cc.Node
                },
                title: {
                    default: null,
                    type: cc.Label
                },
                starts: {
                    default: null,
                    type: cc.Node
                },
                content: {
                    default: null,
                    type: cc.Node
                },
                missionItem: {
                    default: null,
                    type: cc.Node
                },
                missionSpriteAtlas: {
                    default: null,
                    type: cc.SpriteAtlas
                },
                missions: {
                    default: null
                },
                gameApplication: {
                    default: null,
                    type: Object
                },
                watchADTip: {
                    default: null,
                    type: cc.Node
                },
                unlock_bid: {
                    default: 0,
                    type: cc.Integer
                },
                unlock_mid: {
                    default: 0,
                    type: cc.Integer
                },
                unlock_ad: {
                    default: 0,
                    type: cc.Integer
                },
                watched_ad: {
                    default: 0,
                    type: cc.Integer
                },
                missionNodes: {
                    default: {}
                },
                musicBtn: {
                    default: null,
                    type: cc.Sprite
                },
                musicOff: {
                    default: null,
                    type: cc.SpriteFrame
                },
                musicOn: {
                    default: null,
                    type: cc.SpriteFrame
                }
            },
            onLoad: function() {
				this.autoAdapteScreen();
                this.gameApplication = cc.find("GameApplication").getComponent("GameApplication"),
                this.init(),
                cc.director.preloadScene("game", function() {})
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            start: function() {},
            showNoAds: function() {
                this.noAdsView.active = !0
            },
            hideNoAds: function() {
                this.noAdsView.active = !1
            },
            onEnable: function() {
                this.checkMusic()
            },
            checkMusic: function(e, t) {
                "turn" == t && (gameApplication.soundManager.isOpen ? gameApplication.soundManager.setIsOpen(!1) : gameApplication.soundManager.setIsOpen(!0)),
                gameApplication.soundManager.isOpen ? this.musicBtn.spriteFrame = this.musicOn : this.musicBtn.spriteFrame = this.musicOff
            },
            init: function() {
                null == this.missions || Object.keys(this.missions).length <= 0 ? this.gameApplication.getMissions(function(e) {
                    this.missions = e,
                    this.initContents()
                }
                .bind(this)) : this.initContents();
                var t = this;
                SDK().getScore("all", function(e) {
                    t.starts.getComponent(cc.Label).string = e.toString()
                }
                .bind(this))
            },
            initContents: function() {
                this.hideAllItem();
                var t = 0;
                this.missions.forEach(function(e) {
                    this.initMissionItem(e, t),
                    t++
                }
                .bind(this))
            },
            initMissionItem: function(e, t) {
                var i = cc.instantiate(this.missionItem);
                i.parent = this.content,
                i.active = !0;
                var n = (i.tag = t) % 6 + 1;
                i.getChildByName("star"),
                i.getChildByName("lock");
                i.getChildByName("title").getComponent(cc.Label).string = e.title,
                i.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = this.missionSpriteAtlas.getSpriteFrame("mission_" + n);
                var o = e.stars
                  , a = e.bid
                  , c = e.mid
                  , l = e.unlock_ad;
                if (this.missionNodes[a + "_" + c] = i,
                SDK().getScore(a + "_" + c, function(e) {
                    cc.find("unlock/count", i).getComponent(cc.Label).string = e + "/" + o,
                    cc.find("lock/count", i).getComponent(cc.Label).string = e + "/" + o
                }),
                l <= 0)
                    cc.find("unlock", i).active = !0,
                    cc.find("lock", i).active = !1;
                else {
                    cc.find("unlock", i).active = !1;
                    var s = !(cc.find("lock", i).active = !0);
                    SDK().getScore("unlock_" + a + "_" + c, function(e) {
                        l <= e && (s = !0),
                        cc.find("lock/tip", i).getComponent(cc.Label).string = "watch " + l + " videos\n to unlock this new world",
                        cc.find("lock/icon_play/val", i).getComponent(cc.Label).string = e + "/" + l,
                        cc.find("unlock", i).active = s,
                        cc.find("lock", i).active = !s
                    }
                    .bind(this))
                }
                var r = "conf/level_list/level_" + a + "_" + c;
                this.gameApplication.getConf(r, null)
            },
            onWatchVideoBtnClicked: function() {
                var c = this;
                SDK().showVideoAd(function(e) {
                    if (e) {
                        var t = c.unlock_bid
                          , i = c.unlock_mid
                          , n = c.unlock_ad;
                        c.watched_ad++;
                        var o = this.missionNodes[t + "_" + i];
                        cc.find("lock/icon_play/val", o).getComponent(cc.Label).string = c.watched_ad + "/" + n,
                        c.watched_ad >= n ? (c.showLevelPanel(t, i),
                        cc.find("unlock", o).active = !0,
                        cc.find("lock", o).active = !1) : (cc.find("unlock", o).active = !1,
                        cc.find("lock", o).active = !0);
                        var a = {};
                        a["unlock_" + t + "_" + i] = c.watched_ad,
                        SDK().setScore(a, null)
                    } else
                        cc.log("播放视频广告失败"),
                        this.showNoAds()
                }
                .bind(this))
            },
            onMissionItemClicked: function(e) {
                var t = this
                  , i = e.target
                  , n = i.getComponent(cc.Button);
                n.interactable = !1;
                var o = parseInt(i.tag)
                  , a = this.missions[o];
                if (null != a) {
                    var c = a.bid
                      , l = a.mid
                      , s = a.unlock_ad;
                    if (s <= 0)
                        this.showLevelPanel(c, l),
                        n.interactable = !0;
                    else {
                        var r = !1;
                        SDK().getScore("unlock_" + c + "_" + l, function(e) {
                            s <= e && (r = !0),
                            r ? t.showLevelPanel(c, l) : (t.unlock_bid = c,
                            t.unlock_mid = l,
                            t.unlock_ad = s,
                            t.watched_ad = e,
                            t.onWatchVideoBtnClicked()),
                            n.interactable = !0
                        }
                        .bind(this))
                    }
                }
            },
            hideAllItem: function() {
                0 < this.content.childrenCount && this.content.children.forEach(function(e) {
                    e.active = !1,
                    e.destroy()
                })
            },
            showLevelPanel: function(e, t) {
                this.gameApplication.openLevelView(e, t),
                this.gameApplication.soundManager.playSound("btn_click")
            },
            onBackBtnClicked: function() {
                this.gameApplication.backToWelcome(),
                this.gameApplication.soundManager.playSound("btn_click")
            }
        }),
        cc._RF.pop()
    }
    , {}],
    NormalAnimation: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "43480EzecBHBogcLHmzK8wB", "NormalAnimation"),
        cc.Class({
            extends: cc.Component,
            properties: {
                loop: !0,
                isplay: !0,
                sprite: {
                    default: null,
                    type: cc.Sprite
                },
                sprites: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                fps: {
                    default: 5,
                    type: cc.Integer
                },
                index: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                delta: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                rotationForever: !1
            },
            onLoad: function() {
                this.rotationForever && this.rotation()
            },
            rotation: function() {
                var e = cc.repeatForever(cc.rotateBy(.3, 90));
                this.rotationSeq = this.node.runAction(e)
            },
            play: function() {
                this.scheduleOnce(function() {
                    null != this.rotationSeq && this.node.stopAction(this.rotationSeq)
                }, .1),
                this.index = 0,
                this.delta = 0,
                this.isplay = !0,
                this.node.opacity = 255,
                this.sprite.node.active = !0
            },
            update: function(e) {
                if (this.isplay && (this.delta += e,
                0 < this.fps && 0 < this.sprites.length)) {
                    var t = 1 / this.fps;
                    t < this.delta && (this.delta = 0 < t ? this.delta - t : 0,
                    this.sprite.spriteFrame = this.sprites[this.index],
                    this.index = this.index + 1 >= this.sprites.length ? 0 : this.index + 1,
                    this.index <= 0 && 0 == this.loop && (this.rotation(),
                    this.isplay = !1,
                    this.sprite.spriteFrame = this.sprites[0],
                    this.node.opacity = 0))
                }
            }
        }),
        cc._RF.pop()
    }
    , {}],
    Player: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e32198K/PFAYI3D//JNhj6H", "Player"),
        cc.Class({
            extends: cc.Component,
            properties: {
                age: {
                    default: 0,
                    type: cc.Integer
                },
                avatar: {
                    default: ""
                },
                group_id: {
                    default: 0,
                    type: cc.Integer
                },
                is_rebot: {
                    default: 0,
                    type: cc.Integer
                },
                pname: {
                    default: ""
                },
                score: {
                    default: 0,
                    type: cc.Integer
                },
                sex: {
                    default: 0,
                    type: cc.Integer
                },
                user_id: {
                    default: 0,
                    type: cc.Integer
                }
            },
            setUserInfo: function(e) {
                this.age = e.age,
                this.avatar = e.avatar,
                this.group_id = e.group_id,
                this.is_rebot = e.is_rebot,
                this.pname = this.substrName(e.name, 6),
                this.score = e.score,
                this.sex = e.sex,
                this.user_id = e.user_id
            },
            substrName: function(e, t) {
                if (e.replace(/[\u4e00-\u9fa5]/g, "**").length <= t)
                    return e;
                for (var i = 0, n = "", o = 0; o < e.length && (/[\u4e00-\u9fa5]/.test(e[o]) ? i += 2 : i += 1,
                !(t < i)); o++)
                    n += e[o];
                return n + " ..."
            }
        }),
        cc._RF.pop()
    }
    , {}],
    Role: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "01249Rk7stLqpgK0u1Ta5FD", "Role");
        e("./HexCell");
        cc.Class({
            extends: cc.Component,
            properties: {
                bg: {
                    default: null,
                    type: cc.Node
                },
                die: {
                    default: null,
                    type: cc.Node
                },
                arrowNode: {
                    default: null,
                    type: cc.Node
                },
                leftNode: {
                    default: null,
                    type: cc.Node
                },
                rightNode: {
                    default: null,
                    type: cc.Node
                },
                bottomNode: {
                    default: null,
                    type: cc.Node
                },
                topNode: {
                    default: null,
                    type: cc.Node
                },
                _axialCoordinate: {
                    default: cc.v2(0, 0),
                    visible: !1
                },
                axialCoordinate: {
                    get: function() {
                        return this._axialCoordinate
                    },
                    set: function(e) {
                        this._axialCoordinate = cc.v2(e.x, e.y)
                    }
                },
                gameView: {
                    default: null
                },
                darkNode: {
                    default: null,
                    type: cc.Node
                }
            },
            onLoad: function() {},
            start: function() {},
            init: function() {
                this.bg.active = !0,
                this.die.active = !1
            },
            onCollisionEnter: function(e, t) {
                null != this.gameView && (cc.log("other.node:", e.node),
                cc.log("other.node.opacity:", e.node.opacity),
                null != e.node && 0 < e.node.opacity && e.node.active && this.gameView.collisionCallback())
            },
            setDark: function(e) {
                this.darkNode.active = e
            },
            setArrow: function(e, t, i, n) {
                this.topNode.active = e,
                this.bottomNode.active = i,
                this.leftNode.active = t,
                this.rightNode.active = n,
                this.arrowNode.active = !0
            },
            hideArrow: function() {
                this.arrowNode.active = !1
            },
            playDie: function(e) {
                var t = this;
                this.bg.active = !0,
                this.die.active = !1,
                this.die.setContentSize(cc.size(100, 100)),
                this.blinking(this.bg, function() {
                    t.bg.active = !1,
                    t.die.active = !0,
                    t.blinking(t.die, function() {
                        t.die.setContentSize(cc.size(180, 180)),
                        t.blinking(t.die, function() {
                            t.scheduleOnce(function() {
                                t.die.runAction(cc.fadeOut(.2))
                            }, .1)
                        })
                    })
                })
            },
            blinking: function(e, t) {
                var i = cc.delayTime(.12)
                  , n = cc.fadeOut(.01)
                  , o = cc.delayTime(.1)
                  , a = cc.fadeIn(.01)
                  , c = cc.callFunc(function() {
                    t && t()
                })
                  , l = cc.repeat(cc.sequence(i, n, o, a), 2);
                e.stopAllActions(),
                e.runAction(cc.sequence(l, c))
            },
            moveTo: function() {}
        }),
        cc._RF.pop()
    }
    , {
        "./HexCell": "HexCell"
    }],
    RotationForever: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "fb6faggz8ZGIIj857YwdZTb", "RotationForever"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                var e = cc.repeatForever(cc.rotateBy(.3, 90));
                this.node.runAction(e)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    SoundManager: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "2e203tup99JJ5nSDvFuy7AM", "SoundManager"),
        cc.Class({
            extends: cc.Component,
            properties: {
                audioSource: {
                    type: cc.AudioSource,
                    default: null
                },
                btn_click: {
                    url: cc.AudioClip,
                    default: null
                },
                gamewin: {
                    url: cc.AudioClip,
                    default: null
                },
                done: {
                    url: cc.AudioClip,
                    default: null
                },
                error: {
                    url: cc.AudioClip,
                    default: null
                },
                clock: {
                    url: cc.AudioClip,
                    default: null
                },
                uplock: {
                    url: cc.AudioClip,
                    default: null
                },
                isOpen: !0,
                isVoiceOpen: !0
            },
            playSound: function(e) {
                if (this.isOpen)
                    switch (e) {
                    case "btn_click":
                        cc.audioEngine.play(this.btn_click, !1, 1);
                        break;
                    case "done":
                        cc.audioEngine.play(this.done, !1, 1);
                        break;
                    case "error":
                        cc.audioEngine.play(this.error, !1, 1);
                        break;
                    case "clock":
                        cc.audioEngine.play(this.clock, !1, 1);
                        break;
                    case "gamewin":
                        cc.audioEngine.play(this.gamewin, !1, 1);
                        break;
                    case "uplock":
                        cc.audioEngine.play(this.uplock, !1, 1)
                    }
            },
            playBg: function() {
                cc.log("_____playBg:function"),
                this.isOpen && this.audioSource.play()
            },
            setVoiceIsOpen: function(e) {
                if (this.isVoiceOpen = e)
                    try {
                        null != str && HiboGameJs.enableMic(0)
                    } catch (e) {}
                else
                    try {
                        null != str && HiboGameJs.enableMic(1)
                    } catch (e) {}
            },
            setIsOpen: function(e) {
                if (this.isOpen = e,
                this.isOpen) {
                    this.playBg();
                    try {
                        null != str && HiboGameJs.mute(0)
                    } catch (e) {}
                } else {
                    this.audioSource.pause();
                    try {
                        null != str && HiboGameJs.mute(1)
                    } catch (e) {}
                }
            }
        }),
        cc._RF.pop()
    }
    , {}],
    SpriteFrameSet: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
        var n = cc.Class({
            name: "SpriteFrameSet",
            properties: {
                language: "",
                spriteFrame: cc.SpriteFrame
            }
        });
        t.exports = n,
        cc._RF.pop()
    }
    , {}],
    Tower: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "fffd1g1zLBJ9Zn7NHAXbn3T", "Tower");
        e("./HexCell");
        cc.Class({
            extends: cc.Component,
            properties: {
                bubble: {
                    default: null,
                    type: cc.Node
                },
                bubbleAxialCoordinate: {
                    default: cc.v2(0, 0),
                    visible: !1
                },
                _axialCoordinate: {
                    default: cc.v2(0, 0),
                    visible: !1
                },
                axialCoordinate: {
                    get: function() {
                        return this._axialCoordinate
                    },
                    set: function(e) {
                        this._axialCoordinate = cc.v2(e.x, e.y),
                        this.bubbleAxialCoordinate = cc.v2(e.x, e.y)
                    }
                },
                isShooting: !1,
                direction: {
                    default: -1,
                    type: cc.Integer,
                    visible: !1
                },
                f: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                s: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                delay: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                size: {
                    default: cc.size(0, 0),
                    type: cc.Size,
                    visible: !1
                },
                scaleX: {
                    default: 1,
                    type: cc.Integer,
                    visible: !1
                },
                scaleY: {
                    default: 1,
                    type: cc.Integer,
                    visible: !1
                }
            },
            onEnable: function() {
                this.schedule(this.check, .1)
            },
            onDisable: function() {
                this.unschedule(this.check)
            },
            init: function(e) {
                this.direction = e.direction,
                this.f = e.f,
                this.s = e.s,
                this.delay = e.delay,
                this.isShooting = !1,
                this.bubble.active = !1,
                this.node.setContentSize(this.size),
                this.bubble.setScale(this.scaleX, this.scaleY)
            },
            setScaleXY: function(e, t) {
                this.size = cc.size(34 * e, 51 * t),
                this.scaleX = e,
                this.scaleY = t
            },
            check: function() {
                if (null != gameView.myRole) {
                    var e = gameView.myRole.node.getPosition()
                      , t = this.getUIPosition(this.bubble, gameView.myRole.node.parent);
                    if (this.bubble.active && cc.pDistance(e, t) <= 20) {
                        this.unschedule(this.check);
                        var i = {};
                        i.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                        i.reason = "被飞镖撞死",
                        gameApplication.DataAnalytics.levelResult(!1, i),
                        gameView.die()
                    }
                }
            },
            getUIPosition: function(e, t) {
                var i = e.parent.convertToWorldSpaceAR(e.getPosition());
                return t.convertToNodeSpaceAR(i)
            },
            onLoad: function() {
				this.autoAdapteScreen();
			},
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            start: function() {}
        }),
        cc._RF.pop()
    }
    , {
        "./HexCell": "HexCell"
    }],
    Utils: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "3e427LrtQhKv7l/kjbf8v9+", "Utils");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , o = {}
          , h = Math.sqrt(3);
        o.offsetToAxial = function(e) {
            return e.x = e.x - Math.floor(e.y / 2),
            e
        }
        ,
        o.axialToScreen = function(e, t) {
            var i = t * e.y + .5 * t - e.y * lineWidth
              , n = t * e.x + .5 * t - e.x * lineWidth;
            return cc.v2(n, i)
        }
        ,
        o.screenToAxial = function(e, t) {
            var i = cc.v2(0, 0);
            i.y = e.x / (1.5 * t),
            i.x = (e.y - e.x / h) / (h * t);
            var n = this.calculateCubicZ(i)
              , o = Math.round(i.x)
              , a = Math.round(i.y)
              , c = Math.round(n);
            if (o + a + c == 0)
                e.x = o,
                e.y = a;
            else {
                var l = Math.abs(i.x - o)
                  , s = Math.abs(i.y - a)
                  , r = Math.abs(n - c);
                s < l && r < l ? (e.x = -a - c,
                e.y = a) : l < s && r < s ? (e.x = o,
                e.y = -o - c) : l < r && s < r && (e.x = o,
                e.y = a)
            }
            return e
        }
        ,
        o.calculateCubicZ = function(e) {
            return -e.x - e.y
        }
        ,
        o.axialToOffset = function(e) {
            return e.x = e.x + Math.floor(e.y / 2),
            e
        }
        ,
        o.getNeighbors = function(e) {
            var t = cc.v2(0, 0)
              , i = [];
            return t.x = e.x + 1,
            t.y = e.y,
            i.push(cc.v2(t.x, t.y)),
            t.x = e.x - 1,
            t.y = e.y,
            i.push(cc.v2(t.x, t.y)),
            t.x = e.x,
            t.y = e.y - 1,
            i.push(cc.v2(t.x, t.y)),
            t.x = e.x,
            t.y = e.y + 1,
            i.push(cc.v2(t.x, t.y)),
            i
        }
        ,
        o.getNeighborsOBJ = function(e) {
            var t = cc.v2(0, 0)
              , i = {};
            return t.x = e.x + 1,
            t.y = e.y,
            i.r = cc.v2(t.x, t.y),
            t.x = e.x - 1,
            t.y = e.y,
            i.l = cc.v2(t.x, t.y),
            t.x = e.x,
            t.y = e.y - 1,
            i.b = cc.v2(t.x, t.y),
            t.x = e.x,
            t.y = e.y + 1,
            i.t = cc.v2(t.x, t.y),
            i
        }
        ,
        o.isNeighbors = function(e, t) {
            for (var i = this.getNeighbors(e), n = !1, o = 0; o < i.length; o++)
                i[o].equals(t) && (n = !0);
            return n
        }
        ,
        o.cloneObj = function(e) {
            var t = e && e.constructor === Array ? [] : {};
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    if (!e[i]) {
                        t[i] = e[i];
                        continue
                    }
                    t[i] = "object" === n(e[i]) ? o.cloneObj(e[i]) : e[i]
                }
            return t
        }
        ,
        o.GetRandomNum = function(e, t) {
            switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * e + 1, 10);
            case 2:
                return parseInt(Math.random() * (t - e + 1) + e, 10);
            default:
                return 0
            }
        }
        ,
        o.inArray = function(e, t) {
            for (var i = t.length; i--; )
                if (parseInt(t[i]) === parseInt(e))
                    return !0;
            return !1
        }
        ,
        t.exports = o,
        cc._RF.pop()
    }
    , {}],
    ZoominForever: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "0bfed705u9G85RWvZFfoZtO", "ZoominForever"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                var e = cc.repeatForever(cc.sequence(cc.scaleTo(.88, 1.1, 1.1), cc.scaleTo(.88, .9, .9)));
                this.node.runAction(e)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    en: [function(e, t, i) {
        "use strict";
        var n;
        function o(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        cc._RF.push(t, "8c6d6rX4b5LH43PcfbdRlsr", "en"),
        window.i18n || (window.i18n = {}),
        window.i18n.languages || (window.i18n.languages = {}),
        window.i18n.languages.en = {
            label_text: (n = {
                helpTip: "滑动屏幕以指向\n方向并找到球球的女盆朋友！",
                watchAdTip: "观看视频广告以提前解锁\n本大关！",
                watchAdBtn: "解锁",
                invBtn: "和好友 PK",
                watchAdHelip: "观看广告后，您可以\n获得5个帮助道具！"
            },
            o(n, "watchAdBtn", "观看广告"),
            o(n, "shareAdHelp", "分享后可获得5个帮助道具！"),
            o(n, "shareAdBtn", "和好友 PK"),
            o(n, "later", "稍后"),
            o(n, "replay", "重玩"),
            o(n, "timeisup", "现在再看一段视频，\n获取更多时间！"),
            o(n, "timeisup_share", "分享给朋友\n获取更多时间！"),
            o(n, "timeisup_end", "时间到!"),
            o(n, "noads", "获取视频失败！\n稍后再试."),
            o(n, "inv_again", "当前无法接收视频。请关闭此对话框以刷新此列表."),
            o(n, "queding", "确定"),
            o(n, "goShare", "邀请好友一起玩"),
            n)
        },
        cc._RF.pop()
    }
    , {}],
    facebook: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f7e88yLkVlNjqndbdp6NqMq", "facebook");
        var n, o = t("../Utils/Utils"), a = "AD_LOADING", c = "AD_LOAD_SUCCESS", l = "AD_COMPLETE", s = [0x5b7d1cf0050f3, 0x63feaccfa70df], r = function() {
            this.cb = null,
            this.videoAd = null,
            this.videoAdState = null,
            this.InterstitialAd = null,
            this.InterstitialAdState = null
        }, h = {};
        r.prototype.init = function(e) {
            if ("undefined" != typeof FBInstant) {
                if (this.loadVideoAd(),
                this.loadInterstitialAd(),
                "zh_CN" == FBInstant.getLocale())
                    t("LanguageData").init("en");
                h.name = FBInstant.player.getName(),
                cc.loader.load(FBInstant.player.getPhoto(), function(e, t) {
                    h.head = new cc.SpriteFrame(t)
                }),
                h.id = FBInstant.player.getID();
                this.getLocale();
                null != e && e()
            }
        }
        ,
        r.prototype.isGM = function() {
            if ("undefined" == typeof FBInstant)
                return !1;
            var e = FBInstant.player.getID();
            return o.inArray(e, s)
        }
        ,
        r.prototype.clearData = function() {
            if ("undefined" == typeof FBInstant)
                return !1;
            SDK().setScore({
                all: 0
            }, null),
            SDK().setScore({
                my_help: 0
            }, null);
            for (var e = 1; e <= 6; e++) {
                for (var t = 1; t <= 100; t++) {
                    var i = {};
                    i["1_" + e + "_" + t] = 0,
                    this.setScore(i, null);
                    var n = {};
                    n["1_" + e + "_" + t + "_moves"] = 0,
                    this.setScore(n, null)
                }
                var o = {};
                o["1_" + e] = 0,
                this.setScore(o, null);
                var a = {};
                a["unlock_1_" + e] = 0,
                SDK().setScore(a, null)
            }
        }
        ,
        r.prototype.getLocale = function() {
            if ("undefined" != typeof FBInstant)
                return FBInstant.getLocale()
        }
        ,
        r.prototype.share = function(e, t) {
            if ("undefined" != typeof FBInstant) {
                var i = this;
                FBInstant.context.chooseAsync().then(function() {
                    i.doShare(e),
                    null != t && t(!0)
                }).catch(function(e) {
                    null != e.code && "SAME_CONTEXT" == e.code && null != t && t(!1)
                })
            } else
                null != t && t(!0)
        }
        ,
        r.prototype.doShare = function(e) {
            var c = this.getName() + " finish " + e + " missions,Can you beat me?";
            this.getName();
            cc.loader.loadRes("texture2d/game_icon", cc.Texture2D, function(e, t) {
                var i = document.createElement("canvas")
                  , n = i.getContext("2d");
                i.width = 600,
                i.height = 420;
                var o = t.getHtmlElementObj();
                n.drawImage(o, 0, 0);
                var a = i.toDataURL("image/png");
                FBInstant.updateAsync({
                    action: "CUSTOM",
                    cta: "Play Game",
                    template: "join_fight",
                    image: a,
                    text: c,
                    data: {
                        myReplayData: "..."
                    },
                    strategy: "IMMEDIATE",
                    notification: "NO_PUSH"
                }).then(function() {})
            })
        }
        ,
        r.prototype.loadInterstitialAd = function() {
            "undefined" != typeof FBInstant && FBInstant.getInterstitialAdAsync("160840521263423_160841827929959").then(function(e) {
                return this.InterstitialAd = e,
                this.InterstitialAdState = a,
                this.InterstitialAd.loadAsync()
            }
            .bind(this)).catch(function(e) {}
            .bind(this)).then(function() {
                this.InterstitialAdState = c
            }
            .bind(this))
        }
        ,
        r.prototype.switchGameAsync = function(e) {
            if ("undefined" == typeof FBInstant)
                return !1;
            FBInstant.switchGameAsync(e).catch(function(e) {})
        }
        ,
        r.prototype.showInterstitialAd = function(t) {
            "undefined" != typeof FBInstant ? null != this.InterstitialAd ? this.InterstitialAd.showAsync().then(function() {
                this.InterstitialAdState = l,
                t && t(!0),
                this.loadInterstitialAd()
            }
            .bind(this)).catch(function(e) {
                this.InterstitialAdState = l,
                t && t(!1)
            }
            .bind(this)) : (t && t(!1),
            this.loadInterstitialAd()) : t && t(!1)
        }
        ,
        r.prototype.loadVideoAd = function() {
            "undefined" != typeof FBInstant && FBInstant.getRewardedVideoAsync("160840521263423_160841467929995").then(function(e) {
                return this.videoAd = e,
                this.videoAdState = a,
                this.videoAd.loadAsync()
            }
            .bind(this)).then(function() {
                this.videoAdState = c
            }
            .bind(this)).catch(function(e) {
                this.videoAdState = a,
                this.loadVideoAd()
            }
            .bind(this))
        }
        ,
        r.prototype.hasVideoAd = function() {
            return "undefined" != typeof FBInstant && null != this.videoAd
        }
        ,
        r.prototype.showVideoAd = function(t) {
            "undefined" != typeof FBInstant ? null != this.videoAd ? (cc.game.pause(),
            this.videoAd.showAsync().then(function() {
                this.videoAdState = l,
                t && t(!0),
                cc.game.resume(),
                this.loadVideoAd()
            }
            .bind(this)).catch(function(e) {
                this.videoAdState = l,
                t && t(!1),
                cc.game.resume()
            }
            .bind(this))) : (t && t(!1),
            cc.game.resume(),
            this.loadVideoAd()) : t && t(!0)
        }
        ,
        r.prototype.getInfo = function() {
            return "undefined" == typeof FBInstant ? {
                id: 1
            } : h
        }
        ,
        r.prototype.getName = function() {
            return "undefined" == typeof FBInstant ? "undefined" : FBInstant.player.getName()
        }
        ,
        r.prototype.getScore = function(t, i, n, o) {
            if ("undefined" == typeof FBInstant) {
                a = void 0 === (a = JSON.parse(cc.sys.localStorage.getItem(t))) || null == a ? 0 : parseInt(a),
                i(a, n, o)
            } else {
                var e = [];
                e.push(t);
                var a = 0;
                FBInstant.player.getDataAsync(e).then(function(e) {
                    a = void 0 === e[t] ? 0 : parseInt(e[t]),
                    i(a, n, o)
                })
            }
        }
        ,
        r.prototype.setScore = function(e, t) {
            if ("undefined" == typeof FBInstant) {
                for (var i in e)
                    cc.sys.localStorage.setItem(i, e[i]);
                null != t && t()
            } else
                FBInstant.player.setDataAsync(e).then(function() {
                    null != t && t()
                })
        }
        ,
        e.exports = function() {
            return n || (n = new r),
            n
        }
        ,
        cc._RF.pop()
    }
    , {
        "../Utils/Utils": "Utils",
        LanguageData: "LanguageData"
    }],
    globals: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f774aa2KJxEp68y3WRvT7GZ", "globals"),
        window.SDK = e("../SDK/facebook"),
        window.playTimesAD = 1,
        window.isDebug = !1,
        window.lineWidth = 6,
        window.plusHelp = 5,
        window.openAllLevel = !1,
        cc._RF.pop()
    }
    , {
        "../SDK/facebook": "facebook"
    }],
    "polyglot.min": [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
        var n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        n = void 0,
        o = function(t) {
            function e(e) {
                e = e || {},
                this.phrases = {},
                this.extend(e.phrases || {}),
                this.currentLocale = e.locale || "en",
                this.allowMissing = !!e.allowMissing,
                this.warn = e.warn || i
            }
            function o(e, t, i) {
                var n, o, a, c, l, s, r;
                return null != i && e ? (a = (o = e.split(h))[(c = t,
                l = i,
                u[(s = c,
                r = function(e) {
                    var t, i, n, o = {};
                    for (t in e)
                        if (e.hasOwnProperty(t))
                            for (n in i = e[t])
                                o[i[n]] = t;
                    return o
                }(d),
                r[s] || r.en)](l))] || o[0],
                n = a.replace(/^\s+|\s+$/g, "")) : n = e,
                n
            }
            function i(e) {
                t.console && t.console.warn && t.console.warn("WARNING: " + e)
            }
            e.VERSION = "0.4.3",
            e.prototype.locale = function(e) {
                return e && (this.currentLocale = e),
                this.currentLocale
            }
            ,
            e.prototype.extend = function(e, t) {
                var i;
                for (var n in e)
                    e.hasOwnProperty(n) && (i = e[n],
                    t && (n = t + "." + n),
                    "object" == (void 0 === i ? "undefined" : a(i)) ? this.extend(i, n) : this.phrases[n] = i)
            }
            ,
            e.prototype.clear = function() {
                this.phrases = {}
            }
            ,
            e.prototype.replace = function(e) {
                this.clear(),
                this.extend(e)
            }
            ,
            e.prototype.t = function(e, t) {
                var i, n;
                return "number" == typeof (t = null == t ? {} : t) && (t = {
                    smart_count: t
                }),
                "string" == typeof this.phrases[e] ? i = this.phrases[e] : "string" == typeof t._ ? i = t._ : this.allowMissing ? i = e : (this.warn('Missing translation for key: "' + e + '"'),
                n = e),
                "string" == typeof i && (t = function(e) {
                    var t = {};
                    for (var i in e)
                        t[i] = e[i];
                    return t
                }(t),
                n = function(e, t) {
                    for (var i in t)
                        "_" !== i && t.hasOwnProperty(i) && (e = e.replace(new RegExp("%\\{" + i + "\\}","g"), t[i]));
                    return e
                }(n = o(i, this.currentLocale, t.smart_count), t)),
                n
            }
            ,
            e.prototype.has = function(e) {
                return e in this.phrases
            }
            ;
            var h = "||||"
              , u = {
                chinese: function(e) {
                    return 0
                },
                german: function(e) {
                    return 1 !== e ? 1 : 0
                },
                french: function(e) {
                    return 1 < e ? 1 : 0
                },
                russian: function(e) {
                    return e % 10 == 1 && e % 100 != 11 ? 0 : 2 <= e % 10 && e % 10 <= 4 && (e % 100 < 10 || 20 <= e % 100) ? 1 : 2
                },
                czech: function(e) {
                    return 1 === e ? 0 : 2 <= e && e <= 4 ? 1 : 2
                },
                polish: function(e) {
                    return 1 === e ? 0 : 2 <= e % 10 && e % 10 <= 4 && (e % 100 < 10 || 20 <= e % 100) ? 1 : 2
                },
                icelandic: function(e) {
                    return e % 10 != 1 || e % 100 == 11 ? 1 : 0
                }
            }
              , d = {
                chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                french: ["fr", "tl", "pt-br"],
                russian: ["hr", "ru"],
                czech: ["cs"],
                polish: ["pl"],
                icelandic: ["is"]
            };
            return e
        }
        ,
        "function" == typeof define && define.amd ? define([], function() {
            return o(n)
        }) : "object" == (void 0 === i ? "undefined" : a(i)) ? t.exports = o(n) : n.Polyglot = o(n),
        cc._RF.pop()
    }
    , {}],
    zh: [function(e, t, i) {
        "use strict";
        var n;
        function o(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        cc._RF.push(t, "052f3sYjnRNDY4qAIzWph5c", "zh"),
        window.i18n || (window.i18n = {}),
        window.i18n.languages || (window.i18n.languages = {}),
        window.i18n.languages.zh = {
            label_text: (n = {
                helpTip: "滑动屏幕指引方向，找出迷宫的出口！!",
                watchAdTip: "观看视频广告 \n可提前解锁此关卡!",
                watchAdBtn: "解锁关卡",
                invBtn: "邀请好友",
                watchAdHelip: "观看视频  \n可获得5个帮助!"
            },
            o(n, "watchAdBtn", "好的!"),
            o(n, "shareAdHelp", "分享给好友，\n可以获得5个帮助!"),
            o(n, "shareAdBtn", "分享"),
            o(n, "later", "关闭"),
            o(n, "replay", "重新开始"),
            o(n, "timeisup", "观看视频获得\n额外的5秒时间!"),
            o(n, "timeisup_share", "分享给好友获得\n额外的5秒时间!"),
            o(n, "timeisup_end", "时间到了!"),
            o(n, "noads", "广告暂时缺失，\n请稍后尝试。"),
            o(n, "inv_again", "不能给当前用户发送邀请，请尝试邀请其他用户."),
            o(n, "queding", "确定"),
            o(n, "goShare", "和朋友一起玩吧!"),
            n)
        },
        cc._RF.pop()
    }
    , {}]
}, {}, ["globals", "GameApplication", "Player", "SoundManager", "DataAnalytics", "facebook", "AnimFunc", "NormalAnimation", "RotationForever", "ZoominForever", "Enemy", "GameView", "HexCell", "Role", "Tower", "LevelView", "LoadingView", "MainView", "Utils", "en", "zh", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min"]);
