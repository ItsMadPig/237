// passenger's UI


window.addEventListener('load', function(){
    UI.C = {};
    UI.initTransitionEnd();
    UI.initDom();
    UI.initEvents();
});


var UI = {

    //==================
    //  INIT
    //==================

    initTransitionEnd: function(){
        if ($.browser.webkit){
            this.C.TRANSITION_END = "webkitTransitionEnd";
        }
        else if ($.browser.opera){
            this.C.TRANSITION_END = "oTransitionEnd";
        }
        else {
            this.C.TRANSITION_END = "transitionend";
        }
    },

    initDom: function(){
        this.dom = {
            header:$('.header'),
            page: $('.page'),
            titleMain: $('.titleMain'),
            initiallyHidden: $('.initiallyHidden'),
            overlayL: $('.overlayL'),
            overlayR: $('.overlayR'),
            overlayLX: $('.overlayLX'),
            popUpT2: $('.popUpT2'),
            popUpT3: $('.popUpT3'),
            chooseAddressBookLay: $('#chooseAddressBookLay'),
            chooseDriversLay: $('#chooseDriversLay'),
            menuOverlay: $('#menu'),
            bookOverlay: $('#rideBook'),

            //process balls
            ball2: $('.ball2'),
            ball3: $('.ball3'),
            ball4: $('.ball4'),
            line1: $('.line1'),
            line2: $('.line2'),
            line3: $('.line3'),
            pulse2: $('.pulse2'),
            pulse3: $('.pulse3'),
            pulse4: $('.pulse4'),
            hideBall: $('.hideBall'),

            //menu items overlay
            addressBookOverlay: $('#addressBook'),
            driversOverlay: $('#drivers'),
            settingsOverlay: $('#settings'),
            aboutOverlay: $('#about'),
            waitingSlide: $('#waitingSlide'),
            onRideSlide: $('#onRideSlide'),

            // menu bottons action
            menuButton: $('#menuButton'),
            bookButton: $('#bookButton'),
            backLeftButton: $('.backLeftButton'),
            backRightButton: $('.backRightButton'),

            // hidden main menu
            rideBookBut: $('.rideBookBut'),
            backRideBookBut: $('#backRideBookBut'),
            addressBut: $('.addressBut'),
            backAddressBut: $('#backAddressBut'),
            driversBut: $('.driversBut'),
            backDriversBut: $('#backDriversBut'),
            settingsBut: $('.settingsBut'),
            backSettingsBut: $('#backSettingsBut'),
            aboutBut: $('.aboutBut'),
            backAboutBut: $('#backAboutBut'),

            //set location
            setLoForm: $('#setLoForm'),
            request: $('#request'),
            setLocationArea: $("#setLocation_area"),

            startPS: $('#startPS'),
            endPS: $('#endPS'),
            timeSetS: $('#timeSetS'),
            driverChooseS: $('#driverChooseS'),
            startP: $('#startP'),
            endP: $('#endP'),
            timeSet: $('#timeSet'),


            driverChoose: $('#driverChoose'),
            chooseDriverBut: $('.chooseDriverBut'),
            addressBook_icon: $('.addressBook_icon'),
            chooseAddressBut:$ ('.chooseAddressBut'),



            //choose driver
            assignDriverBut: $('#assignDriverBut'),
            assignDriverInput: $('#assignDriverInput'),
            chooseMyDriverBut: $('#chooseMyDriverBut'),
            nowBut: $('#nowBut'),
            nowInput: $('#nowInput'),
            datePicker: $('#pickupTime'),

            //waiting & on the ride
            timeToPickup: $('#timeToPickup'),
            circleComfirm: $('.circleComfirm'),
            bumpMeet: $('#bumpMeet'),
            circleRolling: $('.circleRolling'),
            bumpArrive: $('#bumpArrive'),
            waitingSlide: $('#waitingSlide'),
            onRideSlide: $('#onRideSlide'),
            receipt: $('#receipt'),
            rideDone: $('#rideDone'),
            rotate: $('.rotate'),


            //rating
            r0: $('.r0'),
            r1: $('.r1'),
            r2: $('.r2'),
            r3: $('.r3'),
            r4: $('.r4'),
            r5: $('.r5'),
            rp1: $('.rp1'),
            rp2: $('.rp2'),
            rp3: $('.rp3'),
            rp4: $('.rp4'),
            rp5: $('.rp5'),

    }

        this.dom.menuOverlay.removeClass('initiallyHidden');
        this.dom.menuOverlay.detach();

        this.dom.bookOverlay.removeClass('initiallyHidden');
        this.dom.bookOverlay.detach();

        this.dom.addressBookOverlay.removeClass('initiallyHidden');
        this.dom.addressBookOverlay.detach();

        this.dom.driversOverlay.removeClass('initiallyHidden');
        this.dom.driversOverlay.detach();

        this.dom.settingsOverlay.removeClass('initiallyHidden');
        this.dom.settingsOverlay.detach();

        this.dom.aboutOverlay.removeClass('initiallyHidden');
        this.dom.aboutOverlay.detach();


        this.dom.chooseAddressBookLay.removeClass('initiallyHidden');
        this.dom.chooseAddressBookLay.detach();
        this.dom.chooseDriversLay.removeClass('initiallyHidden');
        this.dom.chooseDriversLay.detach();


        this.dom.waitingSlide.removeClass('initiallyHidden');
        this.dom.waitingSlide.detach();

        this.dom.onRideSlide.removeClass('initiallyHidden');
        this.dom.onRideSlide.detach();

        //interaction
        //(function(){ })();

    },

    initEvents: function(){

        this.dom.menuButton.onButtonTap(this.showMenu.bind(this));
        this.dom.backLeftButton.onButtonTap(this.hideMenu.bind(this));

        this.dom.bookButton.onButtonTap(this.showBook.bind(this));
        this.dom.backRightButton.onButtonTap(this.hideBook.bind(this));

        this.dom.rideBookBut.onButtonTap(this.showBook.bind(this));
        this.dom.backRideBookBut.onButtonTap(this.hideBook.bind(this));

        this.dom.addressBut.onButtonTap(this.showAddressBook.bind(this));
        this.dom.backAddressBut.onButtonTap(this.hideAddressBook.bind(this));

        this.dom.driversBut.onButtonTap(this.showDrivers.bind(this));
        this.dom.backDriversBut.onButtonTap(this.hideDrivers.bind(this));

        this.dom.settingsBut.onButtonTap(this.showSettings.bind(this));
        this.dom.backSettingsBut.onButtonTap(this.hideSettings.bind(this));

        this.dom.aboutBut.onButtonTap(this.showAbout.bind(this));
        this.dom.backAboutBut.onButtonTap(this.hideAbout.bind(this));


        //set location
        this.dom.startPS.onButtonTap(this.toggleStartP.bind(this));
        this.dom.endPS.onButtonTap(this.toggleEndP.bind(this));

        this.dom.timeSetS.onButtonTap(this.toggleTimeSet.bind(this));
        this.dom.driverChooseS.onButtonTap(this.toggleDriverChoose.bind(this));

        this.dom.nowBut.onButtonTap(this.tapNow.bind(this));
        this.dom.datePicker.onButtonTap(this.startDatePicker.bind(this));
        this.dom.assignDriverBut.onButtonTap(this.assignDriverOn.bind(this));

        this.dom.request.onButtonTap(this.checkInputsFull.bind(this));
        this.dom.bumpMeet.onButtonTap(this.goToRide.bind(this));
        this.dom.bumpArrive.onButtonTap(this.goToReceipt.bind(this));

        this.dom.addressBook_icon.onButtonTap(this.chooseFromAddressBook.bind(this));
        this.dom.chooseMyDriverBut.onButtonTap(this.chooseFromDriverContacts.bind(this));
        this.dom.chooseDriverBut.onButtonTap(this.giveDriverBack.bind(this));
        this.dom.chooseAddressBut.onButtonTap(this.giveAddressBack.bind(this));




        //rating
        this.dom.rp1.onButtonTap(this.rating1.bind(this));
        this.dom.rp2.onButtonTap(this.rating2.bind(this));
        this.dom.rp3.onButtonTap(this.rating3.bind(this));
        this.dom.rp4.onButtonTap(this.rating4.bind(this));
        this.dom.rp5.onButtonTap(this.rating5.bind(this));

        this.dom.rideDone.onButtonTap(this.allRideDone.bind(this));

        // testing:
        //this.dom.header.onButtonTap(this.changeHeaderColor.bind(this));
    },

    //==================
    //  OVERLAY 1
    //==================

    showLeftOverlay: function(overlay){
        this.dom.overlayL.append(overlay);
        this.dom.page.css('overflow', 'hidden');
        this.dom.overlayL.removeClass('hiddenL');
    },

    showRightOverlay: function(overlay){
        this.dom.overlayR.append(overlay);
        this.dom.page.css('overflow', 'hidden');
        this.dom.overlayR.removeClass('hiddenR');
    },

    hideLeftOverlay: function(overlay){
        this.dom.overlayL.addClass('hiddenL');
        this.dom.overlayL.one(this.C.TRANSITION_END, function(e){
            overlay.detach();
            this.dom.page.css('overflow', 'auto');
        }.bind(this));
    },

    hideRightOverlay: function(overlay){
        this.dom.overlayR.addClass('hiddenR');
        this.dom.overlayR.one(this.C.TRANSITION_END, function(e){
            overlay.detach();
            this.dom.page.css('overflow', 'auto');
        }.bind(this));
    },

    showMenu: function(){
        this.showLeftOverlay(this.dom.menuOverlay);
    },

    showBook: function(){
        this.showRightOverlay(this.dom.bookOverlay);
    },

    hideMenu: function(){
        this.hideLeftOverlay(this.dom.menuOverlay);
    },

    hideBook: function(){
        this.hideRightOverlay(this.dom.bookOverlay);
    },


    //==================
    //  OVERLAY 2
    //==================

    showXOverlay: function(overlay){
        this.dom.overlayLX.append(overlay);
        //this.dom.page.css('overflow', 'hidden');
        this.dom.overlayLX.removeClass('hiddenLX');
    },

    hideXOverlay: function(overlay){
        this.dom.overlayLX.addClass('hiddenLX');
        this.dom.overlayLX.one(this.C.TRANSITION_END, function(e){
            overlay.detach();
            this.dom.page.css('overflow', 'auto');
        }.bind(this));
    },

    //  Address Book

    showAddressBook: function(){
        this.showXOverlay(this.dom.addressBookOverlay);

    },
    hideAddressBook: function(){
        this.hideXOverlay(this.dom.addressBookOverlay);
    },

    //  Driver Contacts

    showDrivers: function(){
        this.showXOverlay(this.dom.driversOverlay);

    },
    hideDrivers: function(){
        this.hideXOverlay(this.dom.driversOverlay);
    },

    //  Settings

    showSettings: function(){
        this.showXOverlay(this.dom.settingsOverlay);

    },
    hideSettings: function(){
        this.hideXOverlay(this.dom.settingsOverlay);
    },

    //  About

    showAbout: function(){
        this.showXOverlay(this.dom.aboutOverlay);

    },
    hideAbout: function(){
        this.hideXOverlay(this.dom.aboutOverlay);
    },




    // choose addressBook
    showDriverContacts: function(){
        this.showXOverlay(this.dom.chooseDriversLay);
    },

    hideDriverContacts: function(){
        this.hideXOverlay(this.dom.chooseDriversLay);
    },

    // choose contactBook
    chooseFromAddressBook: function(){
        this.showXOverlay(this.dom.chooseAddressBookLay);
    },
    hideAddressBookLay: function(){
        this.hideXOverlay(this.dom.chooseAddressBookLay);
    },

    //==================
    //  popup
    //==================
    showPopupT2: function(overlay){
        this.dom.popUpT2.append(overlay);
        this.dom.popUpT2.removeClass('hiddenT2');
    },
    hidePopupT2: function(overlay){
        this.dom.popUpT2.addClass('hiddenT2');
        this.dom.popUpT2.one(this.C.TRANSITION_END, function(e){
            overlay.detach();
        }.bind(this));
    },
    showPopupT3: function(overlay){
        this.dom.popUpT3.append(overlay);
        this.dom.popUpT3.removeClass('hiddenT3');
    },
    showWaitingSlide: function(){
        this.showPopupT2(this.dom.waitingSlide);
    },
    hideWaitingSlide: function(){
        this.hidePopupT2(this.dom.waitingSlide);
    },
    showOnRideSlide: function(){
        this.showPopupT3(this.dom.onRideSlide);
    },

    //==================
    //  set location
    //==================
    toggleStartP: function(){
        this.dom.startP.toggleClass("fullWidth");
    },
    toggleEndP: function(){
        this.dom.endP.toggleClass("fullWidth");
    },
    toggleTimeSet: function(){
        this.dom.timeSet.toggleClass("fullWidth");
    },
    toggleDriverChoose: function(){
        this.dom.driverChoose.toggleClass("fullWidth");
    },


    giveAddressBack: function(){
        // close chooseAddressBookLay
        this.hideAddressBookLay();
        // send the value from address book back
    },



    tapNow:function(){
        if (this.dom.nowInput.is(":checked") === false){
            this.dom.nowBut.css('background-color', 'black');
        }
        else{
            this.dom.nowBut.css('background-color', '#18955b');
        }

        this.dom.datePicker.css('background-color', '#18955b');

        // clear datePicker content
    },

    startDatePicker: function(){
        if (this.dom.nowInput.is(":checked") === true){
            this.dom.nowBut.css('background-color', '#18955b');
            this.dom.nowInput.prop('checked', false);
        }
        this.dom.datePicker.css('background-color', 'black');
    },

    assignDriverOn: function(){
        if (this.dom.assignDriverInput.is(":checked") === false){
            this.dom.assignDriverBut.css('background-color', 'black');
        }
        else{
            this.dom.assignDriverBut.css('background-color', '#69b80c');
        }
        // change div's html of ChooseDriver back

        this.dom.chooseMyDriverBut.css('background-color', '#69b80c');
    },

    chooseFromDriverContacts: function(){
        if (this.dom.assignDriverInput.is(":checked") === true){
            this.dom.assignDriverBut.css('background-color', '#69b80c');
            this.dom.assignDriverInput.prop('checked', false);
        }
        //open the Driver contacts
        this.showDriverContacts();

        //change div's html to driver's name
        this.dom.chooseMyDriverBut.css('background-color', 'black');
    },

    giveDriverBack: function(){
        //close the chooseDriversLay
        this.hideDriverContacts();

        //send the value of driver chosen back to previous page

    },

    //==================
    //  go to 2nd step
    //==================
    ///////////////////////////check if any inputs has value, then slide in request button
    checkInputsFull: function(){


        console.log(this.dom.setLocationArea[0].children[2].children[1].children[0].children[0].checked);
        console.log(this.dom.setLocationArea[0].children[2].children[2]);
        if (this.dom.setLocationArea[0].children[0].children[1].children[0].value
            ===""){
            //if pickup location not filled
            alert('Fill in pickup location!');
        }else if (this.dom.setLocationArea[0].children[1].children[1].children[0].value
            ===""){
            //if dropoff location not filled
            alert('Fill in dropoff location!');
        }else if (!this.dom.setLocationArea[0].children[2].children[1].children[0].children[0].checked){
            //if when not specified
            alert('Specify time for pickup!');
        }else if (!this.dom.setLocationArea[0].children[3].children[1].children[0].children[0].checked){
            //if who not specified
            alert('Specify a driver!')
        }else{
            console.log("filled!");
            //go to "wait for pickup" step (2rd step)
            this.dom.setLocationArea.remove();
            this.dom.request.remove();
            this.dom.titleMain.html("wait for pickup");
            this.showWaitingSlide();

            // when driver picks up the passenger -> bump
            this.dom.bumpMeet.addClass("circleRolling");

            //processBall goes to step 2
            this.dom.line1.removeClass("hideBall");
            this.dom.ball2.removeClass("hideBall");
            this.dom.pulse2.removeClass("hideBall");
        }
    },

    //==================
    //  go to 3rd step
    //==================
    goToRide: function(){
        this.dom.timeToPickup.remove();
        this.dom.bumpMeet.remove();
        this.dom.titleMain.html("on the ride");
        this.hideWaitingSlide();
        this.showOnRideSlide();

        // when arrive -> bump
        this.dom.bumpArrive.addClass("circleRolling");

        //processBall goes to step 3
        this.dom.line2.removeClass("hideBall");
        this.dom.ball3.removeClass("hideBall");
        this.dom.pulse3.removeClass("hideBall");

    },
    //==================
    //  go to 4th step
    //==================
    goToReceipt: function(){
        this.dom.receipt.addClass("moveReceipt");
        this.dom.titleMain.html("Receipt");

        //processBall goes to step 4
        this.dom.line3.removeClass("hideBall");
        this.dom.ball4.removeClass("hideBall");
        this.dom.pulse4.removeClass("hideBall");
    },



    //==================
    //  rating
    //==================
    rating1: function(){
        this.dom.r0.addClass("r1");
        this.dom.r0.removeClass("r2 r3 r4 r5");
    },
    rating2: function(){
        this.dom.r0.addClass("r2");
        this.dom.r0.removeClass("r1 r3 r4 r5");
    },
    rating3: function(){
        this.dom.r0.addClass("r3");
        this.dom.r0.removeClass("r1 r2 r4 r5");
    },
    rating4: function(){
        this.dom.r0.addClass("r4");
        this.dom.r0.removeClass("r1 r2 r3 r5");
    },
    rating5: function(){
        this.dom.r0.addClass("r5");
        this.dom.r0.removeClass("r1 r2 r3 r4");
    },

    allRideDone: function(){
        this.dom.rideDone.addClass("rotate");
        location.reload();

    },


    //==================
    //  for test use
    //==================
    changeHeaderColor: function(){
        this.dom.header.css('background-color', 'yellow');
    }
}













