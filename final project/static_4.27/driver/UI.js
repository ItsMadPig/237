// driver's UI

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
            reservationOverlay: $('#reservation'),
            passengerOverlay: $('#passenger'),
            settingsOverlay: $('#settings'),
            aboutOverlay: $('#about'),
            waitingSlide: $('#waitingSlide'),
            onRideSlide: $('#onRideSlide'),

            // menu bottons action
            menuButton: $('#menuButton'),
            reservHeaderButton: $('#reservHeaderButton'),
            backLeftButton: $('.backLeftButton'),
            backRightButton: $('.backRightButton'),

            // hidden main menu

            reservationBut: $('.reservationBut'),
            backReservationBut: $('#backReservationBut'),

            rideBookBut: $('.rideBookBut'),
            backRideBookBut: $('#backRideBookBut'),

            passengerBut: $('.passengerBut'),
            backPassengerBut: $('#backPassengerBut'),

            settingsBut: $('.settingsBut'),
            backSettingsBut: $('#backSettingsBut'),
            aboutBut: $('.aboutBut'),
            backAboutBut: $('#backAboutBut'),

            //set location
            setLoForm: $('#setLoForm'),
            setLocationArea: $("#setLocation_area"),


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


            ////////////////////diver
            //temporary
            newTaskComing:$('#newTaskComing'),


            schedule: $(".schedule"),
            availability: $(".availability"),
            futureTask: $('.futureTask'),

            accept: $('#accept'),
            decline: $('#decline'),

    }

        this.dom.menuOverlay.removeClass('initiallyHidden');
        this.dom.menuOverlay.detach();

        this.dom.bookOverlay.removeClass('initiallyHidden');
        this.dom.bookOverlay.detach();

        this.dom.reservationOverlay.removeClass('initiallyHidden');
        this.dom.reservationOverlay.detach();

        this.dom.passengerOverlay.removeClass('initiallyHidden');
        this.dom.passengerOverlay.detach();

        this.dom.settingsOverlay.removeClass('initiallyHidden');
        this.dom.settingsOverlay.detach();

        this.dom.aboutOverlay.removeClass('initiallyHidden');
        this.dom.aboutOverlay.detach();


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

        this.dom.reservHeaderButton.onButtonTap(this.showReservation.bind(this));
        this.dom.backReservationBut.onButtonTap(this.hideReservation.bind(this));

        this.dom.reservationBut.onButtonTap(this.showReservation.bind(this));
        this.dom.backReservationBut.onButtonTap(this.hideReservation.bind(this));

        this.dom.rideBookBut.onButtonTap(this.showBook.bind(this));
        this.dom.backRideBookBut.onButtonTap(this.hideBook.bind(this));

        this.dom.passengerBut.onButtonTap(this.showPassenger.bind(this));
        this.dom.backPassengerBut.onButtonTap(this.hidePassenger.bind(this));

        this.dom.settingsBut.onButtonTap(this.showSettings.bind(this));
        this.dom.backSettingsBut.onButtonTap(this.hideSettings.bind(this));

        this.dom.aboutBut.onButtonTap(this.showAbout.bind(this));
        this.dom.backAboutBut.onButtonTap(this.hideAbout.bind(this));


        //working progress

        this.dom.accept.onButtonTap(this.goToPickup.bind(this));
        //this.dom.deline.onButtonTap(this.declineTask.bind(this));
        this.dom.bumpMeet.onButtonTap(this.goToRide.bind(this));
        this.dom.bumpArrive.onButtonTap(this.goToReceipt.bind(this));
        this.dom.rideDone.onButtonTap(this.allRideDone.bind(this));


        // temporary
        this.dom.newTaskComing.onButtonTap(this.newTaskComing.bind(this));

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

    hideMenu: function(){
        this.hideLeftOverlay(this.dom.menuOverlay);
    },



    showBook: function(){
        this.showRightOverlay(this.dom.bookOverlay);
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

    //  reservation

    showReservation: function(){
        this.showXOverlay(this.dom.reservationOverlay);

    },
    hideReservation: function(){
        this.hideXOverlay(this.dom.reservationOverlay);
    },

    // ride book


    showBook: function(){
        this.showXOverlay(this.dom.bookOverlay);
    },

    hideBook: function(){
        this.hideXOverlay(this.dom.bookOverlay);
    },

    //  passengerContacts

    showPassenger: function(){
        this.showXOverlay(this.dom.passengerOverlay);

    },
    hidePassenger: function(){
        this.hideXOverlay(this.dom.passengerOverlay);
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


    //======================================================
    //  start working
    //======================================================

    //new task coming
    newTaskComing: function(){
        this.dom.titleMain.html("New Task");

        this.dom.schedule.addClass("slideIn transition02");
        this.dom.availability.addClass("slideIn transition02");
        this.dom.futureTask.addClass("slideIn transition1");

        this.dom.newTaskComing.remove();
        this.dom.decline.addClass("circleRolling2");
        this.dom.accept.addClass("circleRolling");
    },


    //decline
    //declineTask: function(){
    //go back to standby page
    //tell user not available
    //},



    //==================
    //  go to 2nd step
    //==================
    goToPickup: function(){
        //go to "wait for pickup" step (2rd step)
        this.dom.setLocationArea.remove();
        this.dom.accept.remove();
        this.dom.decline.remove();
        this.dom.titleMain.html("Go to pickup");
        this.showWaitingSlide();

        // when driver picks up the passenger -> bump
        this.dom.bumpMeet.addClass("circleRolling");

        //processBall goes to step 2
        this.dom.line1.removeClass("hideBall");
        this.dom.ball2.removeClass("hideBall");
        this.dom.pulse2.removeClass("hideBall");
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
        this.dom.titleMain.html("Report");

        //processBall goes to step 4
        this.dom.line3.removeClass("hideBall");
        this.dom.ball4.removeClass("hideBall");
        this.dom.pulse4.removeClass("hideBall");
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













