require 'test_helper'

class HistoryItemsControllerTest < ActionController::TestCase
  setup do
    @history_item = history_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:history_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create history_item" do
    assert_difference('HistoryItem.count') do
      post :create, history_item: { contact_id: @history_item.contact_id, json: @history_item.json, timestamp: @history_item.timestamp, type: @history_item.type }
    end

    assert_redirected_to history_item_path(assigns(:history_item))
  end

  test "should show history_item" do
    get :show, id: @history_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @history_item
    assert_response :success
  end

  test "should update history_item" do
    put :update, id: @history_item, history_item: { contact_id: @history_item.contact_id, json: @history_item.json, timestamp: @history_item.timestamp, type: @history_item.type }
    assert_redirected_to history_item_path(assigns(:history_item))
  end

  test "should destroy history_item" do
    assert_difference('HistoryItem.count', -1) do
      delete :destroy, id: @history_item
    end

    assert_redirected_to history_items_path
  end
end
