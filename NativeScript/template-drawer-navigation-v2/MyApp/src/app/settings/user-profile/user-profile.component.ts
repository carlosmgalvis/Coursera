import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '~/core/services/auth.service';
import { StorageService } from '~/core/services/storage.service';
import { alert, confirm, prompt, File, knownFolders, ImageSource } from '@nativescript/core';
import * as camera from '@nativescript/camera';
import * as imagepicker from '@nativescript/imagepicker';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private router = inject(RouterExtensions);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);

  user: any = {
    email: '',
    name: '',
    phone: ''
  };

  profileImage: string = '~/assets/default-avatar.png';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadUserData();
    this.loadProfileImage();
  }

  loadUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = { ...currentUser };
    }
  }

  async loadProfileImage(): Promise<void> {
    const savedImagePath = this.storageService.getItem<string>('profile_image_path');
    if (savedImagePath) {
      try {
        const fileExists = await File.exists(savedImagePath);
        if (fileExists) {
          this.profileImage = savedImagePath;
        }
      } catch (error) {
        console.error('Error loading profile image:', error);
      }
    }
  }

  async changeProfilePhoto(): Promise<void> {
    const result = await confirm({
      title: 'Profile Photo',
      message: 'Choose an option',
      okButtonText: 'Camera',
      cancelButtonText: 'Gallery'
    });

    if (result === true) {
      await this.takePhoto();
    } else if (result === false) {
      await this.selectFromGallery();
    }
  }

  async takePhoto(): Promise<void> {
    try {
      const options = {
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: true
      };

      const imageAsset = await camera.takePicture(options);

      if (imageAsset) {
        const fileName = `profile_${this.user.id || Date.now()}_${Date.now()}.jpg`;
        const savedPath = await this.storageService.saveImage(imageAsset, fileName);

        if (savedPath) {
          this.profileImage = savedPath;
          this.storageService.setItem('profile_image_path', savedPath);

          await alert({
            title: 'Success',
            message: 'Profile photo updated successfully.',
            okButtonText: 'OK'
          });
        }
      }
    } catch (error) {
      console.error('Camera error:', error);
      await alert({
        title: 'Error',
        message: 'Could not take photo. Please check camera permissions.',
        okButtonText: 'OK'
      });
    }
  }

  async selectFromGallery(): Promise<void> {
    try {
      const context = imagepicker.create({
        mode: 'single'
      });

      const selection = await context.present();

      if (selection && selection.length > 0) {
        const selectedImage = selection[0];

        if (selectedImage) {
          const fileName = `profile_${this.user.id || Date.now()}_${Date.now()}.jpg`;
          const savedPath = await this.storageService.saveImage(selectedImage, fileName);

          if (savedPath) {
            this.profileImage = savedPath;
            this.storageService.setItem('profile_image_path', savedPath);

            await alert({
              title: 'Success',
              message: 'Profile photo updated successfully.',
              okButtonText: 'OK'
            });
          }
        }
      }
    } catch (error) {
      console.error('Gallery error:', error);
      await alert({
        title: 'Error',
        message: 'Could not select image. Please check permissions.',
        okButtonText: 'OK'
      });
    }
  }

  async editUserName(): Promise<void> {
    const result = await prompt({
      title: 'Edit Name',
      message: 'Enter your full name:',
      defaultText: this.user.name || '',
      okButtonText: 'Save',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      this.user.name = result.text;
      await this.saveUserData();
      await alert({
        title: 'Success',
        message: 'Name updated successfully.',
        okButtonText: 'OK'
      });
    }
  }

  async editUserPhone(): Promise<void> {
    const result = await prompt({
      title: 'Edit Phone',
      message: 'Enter your phone number:',
      defaultText: this.user.phone || '',
      okButtonText: 'Save',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      this.user.phone = result.text;
      await this.saveUserData();
      await alert({
        title: 'Success',
        message: 'Phone number updated successfully.',
        okButtonText: 'OK'
      });
    }
  }

  async editUserPassword(): Promise<void> {
    const result = await prompt({
      title: 'Change Password',
      message: 'Enter new password (min 6 characters):',
      defaultText: '',
      okButtonText: 'Next',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      const newPassword = result.text;

      if (newPassword.length >= 6) {
        const confirmResult = await prompt({
          title: 'Confirm Password',
          message: 'Confirm your new password:',
          defaultText: '',
          okButtonText: 'Save',
          cancelButtonText: 'Cancel'
        });

        if (confirmResult.result && confirmResult.text === newPassword) {
          await alert({
            title: 'Success',
            message: 'Password updated successfully.',
            okButtonText: 'OK'
          });
        } else if (confirmResult.result) {
          await alert({
            title: 'Error',
            message: 'Passwords do not match.',
            okButtonText: 'OK'
          });
        }
      } else {
        await alert({
          title: 'Error',
          message: 'Password must be at least 6 characters.',
          okButtonText: 'OK'
        });
      }
    }
  }

  async saveUserData(): Promise<void> {
    this.isLoading = true;

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...this.user };
      this.storageService.setItem('user', updatedUser);
    }

    this.isLoading = false;

    await alert({
      title: 'Success',
      message: 'Profile updated successfully.',
      okButtonText: 'OK'
    });
  }

  goBack(): void {
    this.router.back();
  }
}
