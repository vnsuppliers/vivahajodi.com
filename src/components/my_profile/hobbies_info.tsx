import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Pencil, Trash2, Eye } from "lucide-react";

import { toast } from "sonner";

import type {
  HobbiesInfo as HobbiesInfoType,
} from "@/interfaces/hobbies_info.interface";

import { hobbiesInfoService } from "@/services/hobbies_info.service";

import CreateHobbiesModal from "./modals/CreateHobbiesModal";
import EditHobbiesModal from "./modals/EditHobbiesModal";
import DeleteHobbiesConfirmModal from "./modals/DeleteHobbiesConfirmModal";

interface Props {
  userId: string;
}

const HobbiesInfo = ({ userId }: Props) => {

  const [list, setList] = useState<any[]>([]);

  const [createOpen, setCreateOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [deleteTarget, setDeleteTarget] =
    useState<any>(null);

const initialForm: HobbiesInfoType = {
  hobbies: "",
  interests: "",
  favorite_music: "",
  favorite_movies: "",
  favorite_books: "",
  sports: "",
  activities: "",
  languages_known: "",
  entertainment_preferences: "",
  travel_interests: "",
  status: 1,
  hobbies_info_id: "",
};

  const [form, setForm] =
    useState<HobbiesInfoType>(initialForm);

  // ================= FETCH =================
  const fetchList = useCallback(async () => {
    try {
      if (!userId) return;

      const res =
        await hobbiesInfoService.getByUserId(
          userId
        );

      const data =
        res?.data ?? res ?? [];

      setList(
        Array.isArray(data)
          ? data
          : [data]
      );

    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // ================= SAVE =================
  const handleSave = async () => {
    try {
      setLoading(true);

      const payload = {
        hobbies: form.hobbies || "",
        interests: form.interests || "",
        favorite_music:
          form.favorite_music || "",
        favorite_movies:
          form.favorite_movies || "",
        favorite_books:
          form.favorite_books || "",
        sports: form.sports || "",
        activities:
          form.activities || "",
        languages_known:
          form.languages_known || "",
        entertainment_preferences:
          form.entertainment_preferences || "",
        travel_interests:
          form.travel_interests || "",
        status:
          Number(form.status),
      };

      if (form.hobbies_info_id) {

        console.log(form.hobbies_info_id);

        await hobbiesInfoService.update(
          form.hobbies_info_id,
          payload
        );

        toast.success(
          "Hobbies info updated successfully"
        );

      } else {

        await hobbiesInfoService.create(
          userId,
          payload
        );

        toast.success(
          "Hobbies info created successfully"
        );
      }

      setCreateOpen(false);
      setEditOpen(false);

      setForm(initialForm);

      await fetchList();

    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    try {
      setLoading(true);

      await hobbiesInfoService.delete(
        deleteTarget.encrypted_id
      );

      toast.success(
        "Hobbies info deleted successfully"
      );

      setDeleteOpen(false);

      await fetchList();

    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Delete failed"
      );

    } finally {
      setLoading(false);
    }
  };

  // ================= STRING VIEW =================
  const renderValue = (
    value?: string
  ) => {
    return value?.trim() || "-";
  };

  return (
    <div
      className="
        bg-card
        rounded-3xl
        border
        p-6
        mt-5
        shadow-sm
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-5
        "
      >
        <h2
          className="
            text-xl
            font-bold
          "
        >
          Hobbies Information
        </h2>

        <Button
          onClick={() => {
            setForm(initialForm);
            setCreateOpen(true);
          }}
        >
          Add Hobbies
        </Button>
      </div>

      {/* TABLE */}
      <div
        className="
          overflow-y-auto
          max-h-[500px]
          border
          rounded-xl
        "
      >
        <table
          className="
            min-w-[1400px]
            w-full
            text-sm
          "
        >
          <thead
            className="
              bg-slate-50
              sticky
              top-0
              z-20
            "
          >
            <tr className="border-b">

              <th className="p-3 text-left">
                Hobbies
              </th>

              <th className="p-3 text-left">
                Interests
              </th>

              <th className="p-3 text-left">
                Music
              </th>

              <th className="p-3 text-left">
                Movies
              </th>

              <th className="p-3 text-left">
                Books
              </th>

              <th className="p-3 text-left">
                Sports
              </th>

              <th className="p-3 text-left">
                Activities
              </th>

              <th className="p-3 text-left">
                Languages
              </th>

              <th className="p-3 text-left">
                Entertainment
              </th>

              <th className="p-3 text-left">
                Travel
              </th>

              <th
                className="
                  p-3
                  text-center
                  sticky
                  right-0
                  z-20
                  bg-slate-50
                  w-[120px]
                "
              >
                Actions
              </th>

            </tr>
          </thead>

          <tbody>
            {list.length > 0 ? (
              list.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b
                    hover:bg-slate-50
                  "
                >

                  <td className="p-3">
                    {renderValue(
                      item.hobbies
                    )}

                    <div className="mt-2">
                      {Number(item.status) === 1 ? (
                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1
                            text-xs
                            font-medium
                            text-blue-700
                            bg-blue-100
                            px-2
                            py-0.5
                            rounded-full
                          "
                        >
                          <Eye className="h-3 w-3" />
                          Visible
                        </span>
                      ) : (
                        <span
                          className="
                            text-xs
                            text-gray-500
                            bg-gray-100
                            px-2
                            py-0.5
                            rounded-full
                          "
                        >
                          Hidden
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-3">
                    {renderValue(item.interests)}
                  </td>

                  <td className="p-3">
                    {renderValue(item.favorite_music)}
                  </td>

                  <td className="p-3">
                    {renderValue(item.favorite_movies)}
                  </td>

                  <td className="p-3">
                    {renderValue(item.favorite_books)}
                  </td>

                  <td className="p-3">
                    {renderValue(item.sports)}
                  </td>

                  <td className="p-3">
                    {renderValue(item.activities)}
                  </td>

                  <td className="p-3">
                    {renderValue(item.languages_known)}
                  </td>

                  <td className="p-3">
                    {renderValue(item.entertainment_preferences)}
                  </td>

                  <td className="p-3">
                    {renderValue(item.travel_interests)}
                  </td>

                  {/* ACTIONS */}
                  <td
                    className="
                      p-3
                      sticky
                      right-0
                      z-10
                      bg-white
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >

                      {/* EDIT */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {

                           setForm({
                                hobbies: item.hobbies || "",
                                interests: item.interests || "",
                                favorite_music: item.favorite_music || "",
                                favorite_movies: item.favorite_movies || "",
                                favorite_books: item.favorite_books || "",
                                sports: item.sports || "",
                                activities: item.activities || "",
                                languages_known: item.languages_known || "",
                                entertainment_preferences:
                                    item.entertainment_preferences || "",
                                travel_interests:
                                    item.travel_interests || "",
                                status: item.status || 1,

                                hobbies_info_id: item.encrypted_id,
                            });

                          setEditOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      {/* DELETE */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setDeleteTarget(item);
                          setDeleteOpen(true);
                        }}
                      >
                        <Trash2
                          className="
                            h-4
                            w-4
                            text-red-500
                          "
                        />
                      </Button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="
                    text-center
                    py-10
                    text-muted-foreground
                  "
                >
                  No hobbies info found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE */}
      <CreateHobbiesModal
        open={createOpen}
        onClose={() =>
          setCreateOpen(false)
        }
        loading={loading}
        handleSave={handleSave}
        form={form}
        setForm={setForm}
      />

      {/* EDIT */}
      <EditHobbiesModal
        open={editOpen}
        onClose={() =>
          setEditOpen(false)
        }
        loading={loading}
        handleSave={handleSave}
        form={form}
        setForm={setForm}
      />

      {/* DELETE */}
      <DeleteHobbiesConfirmModal
        open={deleteOpen}
        onClose={() =>
          setDeleteOpen(false)
        }
        onConfirm={handleDelete}
      />

    </div>
  );
};

export default HobbiesInfo;