import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { LoginService } from '../../../login-auth/login.service';
import { MainService } from '../../../service/main-service/main.service';
declare var $: any;
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, NotificationComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router = inject(Router);
  sc = inject(LoginService);
  sc2 = inject(MainService);
  toggleClass = 'ft-maximize';
  public config: any = {};
  submenu: number = 0;
  MainMenu: number = 0;
  subsubmenu: number = 0;
  hidemenu: boolean = true;
  userlist: any = [];
  userId: any;
  usertype: any;
  document: any;

  currentPrimaryColor: string = "";
  colorPalleteArr: string[] = [
    "color-pallete-1",
    "color-pallete-2",
    "color-pallete-3",
    "color-pallete-4",
  ];

  usertypes: any = null;
  userID: any = 0;


  ngOnInit(): void {
    this.callRefershtoken();
    const userTypeString = localStorage.getItem('usertype');
    if (userTypeString !== null) {
      this.usertypes = JSON.parse(userTypeString);
      this.userID = this.usertypes.userID;
    } else {
      this.usertypes = null;
    }
    if (this.userID == 1) {
      this.usertyperouter();
    }
    var mybutton: any = document.getElementById("back-to-top");
    function scrollFunction() {
      100 < document.body.scrollTop || 100 < document.documentElement.scrollTop ? (mybutton.style.display = "block") : (mybutton.style.display = "none");
    }

    mybutton &&
      (window.onscroll = function () {
        scrollFunction();
      });


    // header settings
    $(document).ready(function () {
      $('#topnav-hamburger-icon').click(function () {
        if ($('html').attr('data-sidebar-size') == 'lg') {
          $('html').attr('data-sidebar-size', 'sm');
        } else {
          $('html').attr('data-sidebar-size', 'lg');
        }
        var layout = document.getElementById('sidemenu')?.getAttribute("data-layout");
        var me = null;
        if (layout == 'horizontal') {
          me = 'menu';
        } else {
          me = 'vertical-sidebar-enable';
        }

        if ($("body")[0].classList?.contains(me)) {
          $("body").removeClass(me)
        } else {
          $("body").addClass(me)
        }


        $("#fa-bars-icon").toggleClass('fa-flip-horizontal');
      });
      function setLayout(layout: any) {
        document?.getElementById('sidemenu')?.setAttribute("data-layout", layout);
        document?.getElementById('sidemenu')?.setAttribute("data-topbar", layout == 'vertical' ? 'light' : 'dark');
      }

      function setColor(layout: any) {
        document.getElementById('sidemenu')?.setAttribute("data-layout-mode", layout);
      }

      var light = document.getElementById("layout-mode-light");
      var dark = document.getElementById("layout-mode-dark");

      document.getElementById("customizer-layout01")?.addEventListener('click', (e: any) => setLayout(e.target.value));
      document.getElementById("customizer-layout02")?.addEventListener('click', (e: any) => setLayout(e.target.value));
      light?.addEventListener('click', () => {
        setColor("light");
        if (light) {
          light.style.display = 'none';
        }
        if (dark) {
          dark.style.display = 'block';
        }
      });
      dark?.addEventListener('click', () => {
        setColor("dark");
        if (dark) {
          dark.style.display = 'none';
        }
        if (light) {
          light.style.display = 'block';
        }
      });
    });
  }

  //#region Call Refersh token
  callRefershtoken() {
    var token = this.sc2.getToken();
    this.sc.getRefreshTokensc(token);
  }
  //#endregion

  usertyperouter() {
    this.router.navigate(['/firstProject/SellerDetails']);
  }

  topFunction() {
    (document.body.scrollTop = 0), (document.documentElement.scrollTop = 0);
  }


  getPrimaryColor() {
    this.currentPrimaryColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--vz-header-bg-dark");
  }

  changePrimaryColor(color: string) {
    document.documentElement.style.setProperty("--vz-header-bg-dark", color);
    document.documentElement.style.setProperty("--vz-topnav-item-color-active", color);
    document.documentElement.style.setProperty("--btn-color", color);
    this.getPrimaryColor();
    this.colorPalleteArr.forEach((e) => {
      $("#" + e).removeClass("primary");
    });
  }

  manualPrimaryColor(event: Event) {
    document.documentElement.style.setProperty(
      "--vz-header-bg-dark",
      (event.target as HTMLInputElement).value
    );
    document.documentElement.style.setProperty(
      "--vz-topnav-item-color-active",
      (event.target as HTMLInputElement).value
    );
    document.documentElement.style.setProperty(
      "--btn-color",
      (event.target as HTMLInputElement).value
    );

    this.getPrimaryColor();
    this.colorPalleteArr.forEach((e) => {
      $("#" + e).removeClass("primary");
    });
  }


  // Full Screen
  elem: any;
  openFullscreen() {
    this.elem = document.documentElement;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
      this.toggleClass = 'ft-minimize';
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
      this.toggleClass = 'ft-minimize';
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
      this.toggleClass = 'ft-minimize';
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
      this.toggleClass = 'ft-minimize';
    }

    // // Create a new F11 key press event
    // const event = new KeyboardEvent('keydown', { key: 'F11' });
    // // Dispatch the event on the document
    // this.document.nativeElement.dispatchEvent(event);
  }

  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
      this.toggleClass = 'ft-maximize';
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
      this.toggleClass = 'ft-maximize';
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
      this.toggleClass = 'ft-maximize';
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
      this.toggleClass = 'ft-maximize';
    }
  }

  async logOutbtn()
  {
    this.sc2.clearallinlogout()
    this.router.navigate(['/']);
  }

}
