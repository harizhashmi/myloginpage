import Header from '../components/Header'
import type { User } from '../types'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import { useState } from 'react'


type InfoFieldProps = {
  label: string
  value: string
}

type PasswordFormValues = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

type ProfileProps = {
  user: User
  onLogout: () => void
  onUpdateUser: (user: User) => void
}


function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div>
      <p className="text-sm text-slate-500 mb-2">
        {label}
      </p>

      <p className="text-slate-200">
        {value}
      </p>
    </div>
  )
}

function Profile({
  user,
  onLogout,
  onUpdateUser,
}: ProfileProps) {

  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>()

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<User>({
    defaultValues: user,
  })

  function onSubmitProfile(values: User) {
    onUpdateUser(values)
    setIsEditing(false)
  }



  function onSubmit(data: PasswordFormValues) {
    console.log(data)
    reset()
  }

  const infoFields = [
    {
      label: 'Full Name',
      value: user.name,
    },
    {
      label: 'Email',
      value: user.email,
    },
    {
      label: 'Phone',
      value: user.phone,
    },
    {
      label: 'Role',
      value: user.role,
    },
  ]
  {
    return (

      < div className="min-h-screen bg-slate-950 text-white" >

        {/* Header */}
        < Header
          title="Profile"
          onLogout={onLogout}
        />

        {/* Main */}
        < main className="max-w-4xl mx-auto p-8" >

          {/* Profile Card */}
          < div className="bg-slate-900 border border-slate-800 rounded-2xl p-8" >

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold">
                {user.name.charAt(0)}
              </div>

              {/* User Info */}
              <div className="text-center md:text-left">

                <h2 className="text-3xl font-bold">
                  {user.name}              </h2>

                <p className="text-slate-400 mt-2">
                  {user.role}
                </p>

                <p className="text-slate-500 mt-1">
                  {user.email}              </p>

              </div>

            </div>

          </div >

          {/* Personal Information */}
          < div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8" >

            <h2 className="text-xl font-semibold mb-6">
              Personal Information
            </h2>

            {isEditing ? (
              <form onSubmit={handleProfileSubmit(onSubmitProfile)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="profile-name"
                    label="Full Name"
                    {...registerProfile('name', {
                      required: 'This field is required',
                    })}
                    error={profileErrors.name?.message}
                  />

                  <Input
                    id="profile-email"
                    label="Email"
                    type="email"
                    {...registerProfile('email', {
                      required: 'This field is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Enter a valid email',
                      },
                    })}
                    error={profileErrors.email?.message}
                  />

                  <Input
                    id="profile-phone"
                    label="Phone"
                    {...registerProfile('phone', {
                      required: 'This field is required',
                    })}
                    error={profileErrors.phone?.message}
                  />

                  <Input
                    id="profile-role"
                    label="Role"
                    {...registerProfile('role', {
                      required: 'This field is required',
                    })}
                    error={profileErrors.role?.message}
                  />
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    type="submit"
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      resetProfile()
                      setIsEditing(false)
                    }}
                    className="px-5 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {infoFields.map((field) => (
                  <InfoField key={field.label} {...field} />
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="mt-8 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl opacity-50 "
            >
              Edit Profile
            </button>

          </div >

          {/* Change Password */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8" >

            <h2 className="text-xl font-semibold mb-6">
              Change Password
            </h2>

            <div className="space-y-5">

              <div>
                <Input
                  id="current-password"
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  {...register('currentPassword', {
                    required: 'This field is required',
                  })}
                  error={errors.currentPassword?.message}
                />

              </div>

              <div>
                <Input
                  id="new-password"
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  {...register('newPassword', {
                    required: 'This field is required',
                    minLength: {
                      value: 8,
                      message: 'At least 8 characters',
                    },
                  })}
                  error={errors.newPassword?.message}
                />

              </div>
              <Input
                id="confirm-password"
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
                {...register('confirmPassword', {
                  required: 'This field is required',
                  validate: (value) =>
                    value === watch('newPassword') || 'Passwords do not match',
                })}
                error={errors.confirmPassword?.message}
              />
            </div>

            <button
              type="submit"
              className="mt-6 px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
            >
              Update Password
            </button>

          </form >

        </main >

      </div >
    )
  }
}

export default Profile
