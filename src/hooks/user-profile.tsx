import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function UserProfile({ 
  user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    memberSince: "2023-01-01",
    avatarUrl: "https://i.pravatar.cc/150?img=5"
  }
}) {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)

  const handleChangePassword = (event: React.FormEvent) => {
    event.preventDefault()
    // Implement password change logic here
    console.log("Change password")
    setIsChangePasswordOpen(false)
  }

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    console.log("Delete account")
    setIsDeleteAccountOpen(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-2">
          <Label>Name</Label>
          <div className="font-medium">{user.name}</div>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <div className="font-medium">{user.email}</div>
        </div>
        <div className="space-y-2">
          <Label>Member Since</Label>
          <div className="font-medium">{new Date(user.memberSince).toLocaleDateString()}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AlertDialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Change Password</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Change Password</AlertDialogTitle>
              <AlertDialogDescription>
                Enter your new password below.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form onSubmit={handleChangePassword}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Change Password</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={isDeleteAccountOpen} onOpenChange={setIsDeleteAccountOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount}>Delete Account</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}